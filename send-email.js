require('dotenv').config();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendPromotionalEmail() {
  try {
    console.log('🚀 Sending beautiful promotional email to usmanshafique4342@gmail.com...');
    
    const result = await resend.emails.send({
      from: 'GEN <welcome@gen.app>',
      to: ['usmanshafique4342@gmail.com'],
      subject: '🚀 Welcome to GEN - Your Network Awaits!',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to GEN - Your Network Awaits!</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: #1e293b;
              min-height: 100vh;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
              margin-top: 20px;
              margin-bottom: 20px;
            }
            .hero {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 60px 30px;
              text-align: center;
              color: white;
              position: relative;
              overflow: hidden;
            }
            .hero::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
              animation: float 20s ease-in-out infinite;
            }
            @keyframes float {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              50% { transform: translate(-20px, -20px) rotate(180deg); }
            }
            .hero-content {
              position: relative;
              z-index: 1;
            }
            .hero h1 {
              margin: 0;
              font-size: 36px;
              font-weight: 800;
              letter-spacing: -1px;
              margin-bottom: 16px;
              text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .hero p {
              margin: 0;
              font-size: 18px;
              opacity: 0.95;
              font-weight: 300;
              line-height: 1.4;
            }
            .content {
              padding: 50px 30px;
            }
            .welcome-section {
              text-align: center;
              margin-bottom: 40px;
            }
            .welcome-section h2 {
              font-size: 28px;
              font-weight: 700;
              color: #1e293b;
              margin: 0 0 16px 0;
            }
            .welcome-section p {
              font-size: 16px;
              color: #64748b;
              line-height: 1.6;
              margin: 0;
            }
            .stats-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
              margin: 40px 0;
            }
            .stat-card {
              background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
              padding: 24px 16px;
              border-radius: 16px;
              text-align: center;
              border: 1px solid #e2e8f0;
              transition: transform 0.2s ease;
            }
            .stat-card:hover {
              transform: translateY(-2px);
            }
            .stat-number {
              font-size: 32px;
              font-weight: 800;
              color: #667eea;
              margin: 0;
              line-height: 1;
            }
            .stat-label {
              font-size: 14px;
              color: #64748b;
              margin: 8px 0 0 0;
              font-weight: 500;
            }
            .features-section {
              margin: 40px 0;
            }
            .features-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
              margin-top: 24px;
            }
            .feature-card {
              background: #f8fafc;
              padding: 24px;
              border-radius: 16px;
              border: 1px solid #e2e8f0;
              text-align: center;
            }
            .feature-icon {
              width: 48px;
              height: 48px;
              background: linear-gradient(135deg, #667eea, #764ba2);
              border-radius: 12px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 16px;
            }
            .feature-icon svg {
              width: 24px;
              height: 24px;
              fill: white;
            }
            .feature-title {
              font-size: 16px;
              font-weight: 600;
              color: #1e293b;
              margin: 0 0 8px 0;
            }
            .feature-desc {
              font-size: 14px;
              color: #64748b;
              margin: 0;
              line-height: 1.4;
            }
            .cta-section {
              background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
              padding: 40px 30px;
              text-align: center;
              border-radius: 20px;
              margin: 40px 0;
              border: 1px solid #e2e8f0;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              text-decoration: none;
              padding: 18px 36px;
              border-radius: 16px;
              font-weight: 700;
              font-size: 18px;
              margin: 20px 0;
              transition: all 0.3s ease;
              box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
            }
            .cta-button:hover {
              transform: translateY(-3px);
              box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
            }
            .secondary-button {
              display: inline-block;
              background: transparent;
              color: #667eea;
              text-decoration: none;
              padding: 14px 28px;
              border: 2px solid #667eea;
              border-radius: 12px;
              font-weight: 600;
              font-size: 16px;
              margin: 10px 0;
              transition: all 0.2s ease;
            }
            .secondary-button:hover {
              background: #667eea;
              color: white;
            }
            .footer {
              background: #1e293b;
              padding: 40px 30px;
              text-align: center;
              color: white;
            }
            .footer h3 {
              margin: 0 0 16px 0;
              font-size: 20px;
              font-weight: 700;
            }
            .footer p {
              margin: 0 0 24px 0;
              font-size: 14px;
              color: #94a3b8;
              line-height: 1.5;
            }
            .social-links {
              margin: 24px 0;
            }
            .social-links a {
              display: inline-block;
              margin: 0 12px;
              color: #94a3b8;
              text-decoration: none;
              font-size: 14px;
              transition: color 0.2s ease;
            }
            .social-links a:hover {
              color: #667eea;
            }
            .unsubscribe {
              margin-top: 24px;
              padding-top: 24px;
              border-top: 1px solid #334155;
              font-size: 12px;
              color: #64748b;
            }
            .unsubscribe a {
              color: #667eea;
              text-decoration: none;
            }
            @media (max-width: 600px) {
              .container {
                margin: 10px;
                border-radius: 16px;
              }
              .hero {
                padding: 40px 20px;
              }
              .hero h1 {
                font-size: 28px;
              }
              .content {
                padding: 30px 20px;
              }
              .stats-grid {
                grid-template-columns: 1fr;
                gap: 16px;
              }
              .features-grid {
                grid-template-columns: 1fr;
                gap: 16px;
              }
              .cta-section {
                padding: 30px 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="hero">
              <div class="hero-content">
                <h1>🚀 Welcome to GEN!</h1>
                <p>Your journey to meaningful connections starts here</p>
              </div>
            </div>
            
            <div class="content">
              <div class="welcome-section">
                <h2>Hi Usman! 👋</h2>
                <p>
                  Welcome to the future of networking! GEN is where ambitious professionals, 
                  entrepreneurs, and innovators come together to build meaningful connections 
                  that matter.
                </p>
              </div>

              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-number">2,500+</div>
                  <div class="stat-label">Active Members</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number">15</div>
                  <div class="stat-label">Events This Month</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number">1,200+</div>
                  <div class="stat-label">Connections Made</div>
                </div>
              </div>

              <div class="features-section">
                <h2 style="text-align: center; font-size: 24px; font-weight: 700; color: #1e293b; margin: 0 0 24px 0;">
                  What Makes GEN Special ✨
                </h2>
                <div class="features-grid">
                  <div class="feature-card">
                    <div class="feature-icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </div>
                    <div class="feature-title">Smart Matching</div>
                    <div class="feature-desc">AI-powered compatibility matching based on your interests and goals</div>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                      </svg>
                    </div>
                    <div class="feature-title">Exclusive Events</div>
                    <div class="feature-desc">Curated networking events and round table discussions</div>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div class="feature-title">Verified Profiles</div>
                    <div class="feature-desc">All members are verified professionals and entrepreneurs</div>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div class="feature-title">Quality Connections</div>
                    <div class="feature-desc">Focus on meaningful relationships over quantity</div>
                  </div>
                </div>
              </div>

              <div class="cta-section">
                <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #1e293b;">
                  Ready to Get Started? 🎯
                </h2>
                <p style="margin: 0 0 24px 0; font-size: 16px; color: #64748b;">
                  Complete your profile and start connecting with amazing people in your industry!
                </p>
                <a href="http://localhost:3030/profile" class="cta-button">
                  Complete Your Profile
                </a>
                <br>
                <a href="http://localhost:3030/home" class="secondary-button">
                  Explore the Community
                </a>
              </div>
            </div>
            
            <div class="footer">
              <h3>Join the GEN Revolution 🌟</h3>
              <p>
                Connect with like-minded professionals, discover new opportunities, 
                and build the network that will accelerate your career.
              </p>
              <div class="social-links">
                <a href="#">LinkedIn</a>
                <a href="#">Twitter</a>
                <a href="#">Instagram</a>
                <a href="#">Discord</a>
              </div>
              <div class="unsubscribe">
                <p>
                  You're receiving this because you joined GEN. 
                  <a href="#">Unsubscribe</a> | 
                  <a href="#">Update Preferences</a> | 
                  <a href="#">Privacy Policy</a>
                </p>
                <p style="margin-top: 12px;">
                  GEN - Where Connections Matter<br>
                  Made with ❤️ for ambitious professionals
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Welcome to GEN, Usman!

Your journey to meaningful connections starts here. Join 2,500+ active members in building the network that matters.

What makes GEN special:
• Smart AI-powered matching
• Exclusive networking events
• Verified professional profiles
• Quality over quantity connections

Complete your profile: http://localhost:3030/profile
Explore the community: http://localhost:3030/home

Join the GEN Revolution - Where Connections Matter!

The GEN Team`
    });

    console.log('✅ Beautiful promotional email sent successfully!');
    console.log('📧 Check your inbox at usmanshafique4342@gmail.com');
    console.log('🎨 The email features:');
    console.log('   • Stunning gradient hero section with animated background');
    console.log('   • Community statistics with hover effects');
    console.log('   • Feature cards with beautiful icons');
    console.log('   • Call-to-action buttons with shadows and animations');
    console.log('   • Professional footer with social links');
    console.log('   • Fully responsive design for mobile and desktop');
    console.log('   • Modern typography and color scheme');
    
    return result;
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    throw error;
  }
}

sendPromotionalEmail();
