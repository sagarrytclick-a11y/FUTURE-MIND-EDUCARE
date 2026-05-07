import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Email API called');
    
    const body = await request.json();
    console.log('📧 Received form data:', body);
    
    const { name, email, mobile, courseInterest, neetScore } = body;

    // Validate required fields
    if (!name || !email || !courseInterest) {
      console.log('❌ Validation failed - missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and course interest are required' },
        { status: 400 }
      );
    }

    // Check environment variables
    console.log('🔧 Environment check:');
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length || 0);
    console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
    console.log('FROM_EMAIL:', process.env.FROM_EMAIL);

    // Send email to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'sagarbishtz589@gmail.com';
    console.log('📨 Sending admin email to:', adminEmail);
    
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; margin-bottom: 20px;">New Admission Inquiry</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Student Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mobile:</strong> ${mobile || 'Not provided'}</p>
          <p><strong>Course Interest:</strong> ${courseInterest}</p>
          <p><strong>NEET Score:</strong> ${neetScore || 'Not provided'}</p>
        </div>
        
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; color: white;">
          <p style="margin: 0; font-size: 14px;">
            This inquiry was submitted from the MBBS admission portal. Please contact the student as soon as possible.
          </p>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
          <p style="margin: 0;">
            This is an automated message from the Future Mind Educare admission system.
            <br />
            Submitted on: ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    `;

    console.log('📧 Attempting to send admin email...');
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [adminEmail],
      subject: `New Admission Inquiry: ${name} - ${courseInterest}`,
      html: emailContent,
    });

    console.log('📧 Admin email response:', { data, error });

    if (error) {
      console.error('❌ Email sending failed:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    console.log('✅ Admin email sent successfully!');

    // Send confirmation email to student
    const confirmationContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; margin-bottom: 20px;">Thank You for Your Inquiry!</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="color: #333; line-height: 1.6;">
            Dear ${name},
          </p>
          <p style="color: #333; line-height: 1.6;">
            Thank you for your interest in <strong>${courseInterest}</strong>. We have received your inquiry and our admission team will contact you shortly.
          </p>
          <p style="color: #333; line-height: 1.6;">
            <strong>What happens next:</strong>
          </p>
          <ul style="color: #333; line-height: 1.6; padding-left: 20px;">
            <li>Our admission counselor will review your inquiry</li>
            <li>You'll receive a call/email within 24-48 hours</li>
            <li>We'll guide you through the admission process</li>
            <li>Help you choose the right college based on your profile</li>
          </ul>
        </div>
        
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; color: white;">
          <p style="margin: 0; font-size: 14px;">
            For urgent queries, you can call us at: +91-XXXXXXXXXX
          </p>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
          <p style="margin: 0;">
            Best regards,<br />
            Future Mind Educare Team<br />
            <a href="https://futuremindeducare.com" style="color: #2563eb;">futuremindeducare.com</a>
          </p>
        </div>
      </div>
    `;

    console.log('📧 Attempting to send student confirmation email...');
    const studentResponse = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [email],
      subject: 'Your MBBS Admission Inquiry - Future Mind Educare',
      html: confirmationContent,
    });

    console.log('📧 Student email response:', studentResponse);

    if (studentResponse.error) {
      console.error('❌ Student email sending failed:', studentResponse.error);
    } else {
      console.log('✅ Student confirmation email sent successfully!');
    }

    console.log('🎉 Email process completed successfully!');
    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully! We will contact you soon.' 
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
