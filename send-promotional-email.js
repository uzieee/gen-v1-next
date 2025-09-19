const { EmailService } = require('./src/lib/email.ts');

async function sendPromotionalEmail() {
  try {
    console.log('🚀 Sending promotional email to usmanshafique4342@gmail.com...');
    
    const result = await EmailService.sendPromotionalEmail(
      {
        email: 'usmanshafique4342@gmail.com',
        name: 'Usman',
      },
      {
        recipientName: 'Usman',
        communityStats: {
          totalUsers: 2500,
          eventsThisMonth: 15,
          connectionsMade: 1200,
        },
        newFeatures: [
          'AI-powered profile matching',
          'Exclusive networking events',
          'Round table discussions',
          'Verified professional profiles'
        ],
      }
    );

    if (result.success) {
      console.log('✅ Promotional email sent successfully!');
      console.log('📧 Check your inbox at usmanshafique4342@gmail.com');
    } else {
      console.error('❌ Failed to send email:', result.error);
    }
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

sendPromotionalEmail();
