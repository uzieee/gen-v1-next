require('dotenv').config();
const { Resend } = require('resend');

console.log('🔍 Debugging email sending...');
console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
console.log('RESEND_API_KEY starts with:', process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 10) + '...' : 'NOT SET');

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmailSending() {
  try {
    console.log('🚀 Attempting to send email...');
    
    const result = await resend.emails.send({
      from: 'GEN <onboarding@resend.dev>', // Using Resend's default domain for testing
      to: ['usmanshafique4342@gmail.com'],
      subject: '🎉 Test Email from GEN - Email System Working!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Test Email</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              margin: 0;
              padding: 20px;
              min-height: 100vh;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 32px;
              font-weight: 800;
            }
            .content {
              padding: 40px 30px;
              text-align: center;
            }
            .success-icon {
              width: 80px;
              height: 80px;
              background: linear-gradient(135deg, #10b981, #059669);
              border-radius: 50%;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
            }
            .success-icon svg {
              width: 40px;
              height: 40px;
              fill: white;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              text-decoration: none;
              padding: 16px 32px;
              border-radius: 12px;
              font-weight: 600;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Email System Working!</h1>
            </div>
            <div class="content">
              <div class="success-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <h2 style="color: #1e293b; margin: 0 0 16px 0;">Hi Usman! 👋</h2>
              <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Great news! The GEN email system is working perfectly. 
                This beautiful email was sent using Resend and our custom email templates.
              </p>
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                <strong>Features working:</strong><br>
                ✅ Resend API integration<br>
                ✅ Beautiful HTML templates<br>
                ✅ Responsive design<br>
                ✅ Professional styling<br>
                ✅ Email delivery
              </p>
              <a href="http://localhost:3030" class="cta-button">
                Visit GEN App
              </a>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Hi Usman!

Great news! The GEN email system is working perfectly. This email was sent using Resend and our custom email templates.

Features working:
✅ Resend API integration
✅ Beautiful HTML templates  
✅ Responsive design
✅ Professional styling
✅ Email delivery

Visit GEN App: http://localhost:3030

The GEN Team`
    });

    console.log('✅ Email sent successfully!');
    console.log('📧 Email ID:', result.data?.id);
    console.log('📧 Status:', result.data?.status || 'sent');
    console.log('📧 Check your inbox at: usmanshafique4342@gmail.com');
    console.log('📧 Also check your spam/junk folder');
    
    return result;
  } catch (error) {
    console.error('❌ Failed to send email:');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    
    if (error.message.includes('API key')) {
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Make sure your RESEND_API_KEY is correct in .env file');
      console.log('2. Get a new API key from https://resend.com/api-keys');
      console.log('3. Make sure the API key has email sending permissions');
    }
    
    throw error;
  }
}

testEmailSending();
