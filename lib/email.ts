import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPurchaseReceipt(order: {
  customerName: string;
  customerEmail: string;
  planName: string;
  amountPaid: number;
}) {
  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: order.customerEmail,
      subject: 'Payment Confirmed: Welcome to Future Mind Educare',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 25px; border-radius: 10px;">
          <h2 style="color: #1e293b;">Payment Confirmed: Welcome to Future Mind Educare</h2>
          
          <p>Dear ${order.customerName},</p>
          
          <p>Thank you for choosing Future Mind Educare. We are pleased to confirm that your payment for <strong>${order.planName}</strong> has been successfully processed.</p>
          
          <p>We are excited to partner with you on your upcoming journey and are committed to helping you achieve your goals.</p>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #e2e8f0;">
            <h3 style="margin-top: 0; color: #334155;">Transaction Details</h3>
            <p style="margin: 8px 0; color: #475569;"><strong>Service:</strong> ${order.planName}</p>
            <p style="margin: 8px 0; color: #475569;"><strong>Amount Paid:</strong> ₹${order.amountPaid.toLocaleString()}</p>
            <p style="margin: 8px 0; color: #475569;"><strong>Status:</strong> Paid / Confirmed</p>
          </div>

          <h3 style="color: #1e293b;">Next Steps</h3>
          <p style="color: #475569;">Our senior counselor will contact you on your registered mobile number within the next 2 hours to initiate your onboarding and schedule your first session.</p>
          
          <p style="color: #475569;">If you have any questions, please feel free to reply directly to this email.</p>

          <p style="margin-top: 30px;">Warm regards,<br/><strong>The Future Mind Educare Team</strong></p>
          
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 25px 0;">
          
          <p style="font-size: 12px; color: #94a3b8; text-align: center;">
            Future Mind Educare<br/>
            edufuturemind@gmail.com | 91 9920798988
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}
