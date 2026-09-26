import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import { getAdminRecipients, getCcRecipients, getMailConfigStatus, sendMail } from '@/lib/mailer';
import { adminEnquiryEmail, studentEnquiryEmail } from '@/lib/email-templates';
import { getFirstError, validateEnquiry } from '@/lib/validation';
import { checkEnquiryRateLimit, clientIp } from '@/lib/rate-limit';

function sanitizeHeader(value: string, maxLength = 120): string {
  return value
    .replace(/[\r\n]+/g, ' ')
    .replace(/[<>"'\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body. Please send valid JSON.' },
        { status: 400 }
      );
    }

    const validation = validateEnquiry(
      (body ?? {}) as Record<string, unknown>
    );

    if (!validation.ok) {
      return NextResponse.json(
        {
          error: getFirstError(validation.errors),
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const { name, email, mobile, courseInterest, neetScore, message } = validation.data;

    // Silent throttle: bots/repeat submissions get the exact same success
    // payload, but nothing is stored and no mail is sent.
    const ip = clientIp(request);

    if (!checkEnquiryRateLimit(ip, email).allowed) {
      console.warn('[rate-limit] enquiry submission dropped', {
        ip,
        courseInterest,
      });
      return NextResponse.json(
        {
          success: true,
          emailSent: true,
          message: 'Email sent successfully! We will contact you soon.',
        },
        { status: 200 }
      );
    }

    await connectDB();

    const enquiry = new Enquiry({
      name,
      email,
      mobile,
      courseInterest,
      neetScore,
      notes: message,
    });

    await enquiry.save();

    const adminRecipients = getAdminRecipients();
    const ccRecipients = getCcRecipients();

    const emailData = {
      name,
      email,
      mobile,
      courseInterest,
      neetScore,
      message,
      submittedAt: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    try {
      await sendMail({
        to: adminRecipients,
        ...(ccRecipients.length > 0 ? { cc: ccRecipients } : {}),
        subject: sanitizeHeader(
          `New Admission Inquiry: ${name} - ${courseInterest}`
        ),
        html: adminEnquiryEmail(emailData),
        replyTo: email,
      });
      await Enquiry.updateOne({ _id: enquiry._id }, { emailSent: true });
    } catch (emailError) {
      const status = getMailConfigStatus();
      console.error('Admin email failed:', emailError, 'SMTP status:', status);
      return NextResponse.json(
        {
          success: true,
          emailSent: false,
          message:
            'Inquiry saved, but we could not send the confirmation email. Our team will still contact you.',
        },
        { status: 200 }
      );
    }

    try {
      await sendMail({
        to: email,
        subject: 'Thank you for your enquiry - Future Mind Educare',
        html: studentEnquiryEmail(emailData),
      });
    } catch (studentEmailError) {
      console.error('Student confirmation email failed:', studentEmailError);
    }

    return NextResponse.json(
      {
        success: true,
        emailSent: true,
        message: 'Email sent successfully! We will contact you soon.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
