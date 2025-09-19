require('dotenv').config();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendSimpleTest() {
  try {
    console.log('📧 Sending simple test email...');
    
    const result = await resend.emails.send({
      from: 'GEN <onboarding@resend.dev>',
      to: ['usmanshafique4342@gmail.com'],
      subject: 'GEN Email Test - Simple Version',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #667eea; text-align: center;">GEN Email System Test</h1>
          <p>Hi Usman,</p>
          <p>This is a simple test email to confirm our email system is working.</p>
          <p>If you receive this email, everything is working perfectly!</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3030" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">Visit GEN App</a>
          </div>
          <p>Best regards,<br>The GEN Team</p>
        </div>
      `,
      text: `GEN Email System Test

Hi Usman,

This is a simple test email to confirm our email system is working.

If you receive this email, everything is working perfectly!

Visit GEN App: http://localhost:3030

Best regards,
The GEN Team`
    });

    console.log('✅ Simple test email sent!');
    console.log('📧 Email ID:', result.data?.id);
    console.log('📧 Check your inbox for: "GEN Email Test - Simple Version"');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

sendSimpleTest();
