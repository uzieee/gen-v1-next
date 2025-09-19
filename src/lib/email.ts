import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailTemplate {
  subject: string;
  html: string;
  text?: string;
}

export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface ProfileLikeEmailData {
  recipientName: string;
  likerName: string;
  likerProfileImage?: string;
  profileUrl: string;
  likerProfileUrl: string;
}

export interface PasswordResetEmailData {
  recipientName: string;
  resetUrl: string;
  expiresIn: string;
}

export interface PromotionalEmailData {
  recipientName: string;
  featuredEvent?: {
    name: string;
    date: string;
    location: string;
    image: string;
    description: string;
  };
  newFeatures?: string[];
  communityStats?: {
    totalUsers: number;
    eventsThisMonth: number;
    connectionsMade: number;
  };
}

// Email Templates
export const emailTemplates = {
  profileLike: (data: ProfileLikeEmailData): EmailTemplate => ({
    subject: `❤️ ${data.likerName} liked your profile!`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Someone liked your profile!</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
          }
          .header p {
            margin: 8px 0 0 0;
            font-size: 16px;
            opacity: 0.9;
          }
          .content {
            padding: 40px 30px;
          }
          .like-section {
            text-align: center;
            margin-bottom: 30px;
          }
          .heart-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #ff6b6b, #ee5a52);
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            box-shadow: 0 8px 20px rgba(255, 107, 107, 0.3);
          }
          .heart-icon svg {
            width: 30px;
            height: 30px;
            fill: white;
          }
          .liker-info {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            margin: 20px 0;
            padding: 20px;
            background: #f8fafc;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
          }
          .liker-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #667eea;
          }
          .liker-details h3 {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            color: #1e293b;
          }
          .liker-details p {
            margin: 4px 0 0 0;
            font-size: 14px;
            color: #64748b;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            transition: transform 0.2s ease;
          }
          .cta-button:hover {
            transform: translateY(-2px);
          }
          .secondary-button {
            display: inline-block;
            background: transparent;
            color: #667eea;
            text-decoration: none;
            padding: 12px 24px;
            border: 2px solid #667eea;
            border-radius: 8px;
            font-weight: 500;
            font-size: 14px;
            margin: 10px 0;
          }
          .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }
          .footer p {
            margin: 0;
            font-size: 14px;
            color: #64748b;
            line-height: 1.5;
          }
          .social-links {
            margin: 20px 0;
          }
          .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #667eea;
            text-decoration: none;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>❤️ You've Got a Like!</h1>
            <p>Someone thinks you're amazing</p>
          </div>
          
          <div class="content">
            <div class="like-section">
              <div class="heart-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              
              <h2 style="margin: 0 0 10px 0; font-size: 24px; color: #1e293b;">Hey ${data.recipientName}!</h2>
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #64748b; line-height: 1.5;">
                Great news! Someone just liked your profile on GEN. This could be the start of something amazing! 🎉
              </p>
              
              <div class="liker-info">
                ${data.likerProfileImage ? 
                  `<img src="${data.likerProfileImage}" alt="${data.likerName}" class="liker-avatar">` : 
                  `<div class="liker-avatar" style="background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px;">${data.likerName.charAt(0).toUpperCase()}</div>`
                }
                <div class="liker-details">
                  <h3>${data.likerName}</h3>
                  <p>liked your profile</p>
                </div>
              </div>
              
              <a href="${data.likerProfileUrl}" class="cta-button">
                View ${data.likerName}'s Profile
              </a>
              
              <br>
              
              <a href="${data.profileUrl}" class="secondary-button">
                Update Your Profile
              </a>
            </div>
          </div>
          
          <div class="footer">
            <p>
              <strong>Keep the connections flowing!</strong><br>
              The more active you are, the more people you'll meet.
            </p>
            <div class="social-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Unsubscribe</a>
              <a href="#">Help Center</a>
            </div>
            <p style="margin-top: 20px; font-size: 12px;">
              This email was sent by GEN. If you don't want to receive these emails, you can 
              <a href="#" style="color: #667eea;">unsubscribe here</a>.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Hey ${data.recipientName}!\n\nGreat news! ${data.likerName} just liked your profile on GEN.\n\nView their profile: ${data.likerProfileUrl}\nUpdate your profile: ${data.profileUrl}\n\nKeep the connections flowing!\n\nThe GEN Team`
  }),

  passwordReset: (data: PasswordResetEmailData): EmailTemplate => ({
    subject: '🔐 Reset your GEN password',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset your password</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
          }
          .header p {
            margin: 8px 0 0 0;
            font-size: 16px;
            opacity: 0.9;
          }
          .content {
            padding: 40px 30px;
          }
          .security-section {
            text-align: center;
            margin-bottom: 30px;
          }
          .lock-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #10b981, #059669);
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
          }
          .lock-icon svg {
            width: 30px;
            height: 30px;
            fill: white;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            transition: transform 0.2s ease;
          }
          .cta-button:hover {
            transform: translateY(-2px);
          }
          .warning-box {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 16px;
            margin: 20px 0;
          }
          .warning-box p {
            margin: 0;
            color: #92400e;
            font-size: 14px;
            line-height: 1.5;
          }
          .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }
          .footer p {
            margin: 0;
            font-size: 14px;
            color: #64748b;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Password Reset</h1>
            <p>Secure your account</p>
          </div>
          
          <div class="content">
            <div class="security-section">
              <div class="lock-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
              </div>
              
              <h2 style="margin: 0 0 10px 0; font-size: 24px; color: #1e293b;">Hi ${data.recipientName}!</h2>
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #64748b; line-height: 1.5;">
                We received a request to reset your password for your GEN account. Click the button below to create a new password.
              </p>
              
              <a href="${data.resetUrl}" class="cta-button">
                Reset My Password
              </a>
              
              <div class="warning-box">
                <p>
                  <strong>⚠️ Important:</strong> This link will expire in ${data.expiresIn}. 
                  If you didn't request this password reset, please ignore this email or contact support if you have concerns.
                </p>
              </div>
              
              <p style="margin: 20px 0 0 0; font-size: 14px; color: #64748b;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${data.resetUrl}" style="color: #10b981; word-break: break-all;">${data.resetUrl}</a>
              </p>
            </div>
          </div>
          
          <div class="footer">
            <p>
              <strong>Stay secure!</strong><br>
              For your security, this link expires in ${data.expiresIn}.
            </p>
            <p style="margin-top: 20px; font-size: 12px;">
              If you didn't request this password reset, please ignore this email or 
              <a href="#" style="color: #10b981;">contact support</a>.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Hi ${data.recipientName}!\n\nWe received a request to reset your password for your GEN account.\n\nReset your password: ${data.resetUrl}\n\nThis link will expire in ${data.expiresIn}.\n\nIf you didn't request this password reset, please ignore this email.\n\nThe GEN Team`
  }),

  promotional: (data: PromotionalEmailData): EmailTemplate => ({
    subject: `🚀 Welcome to GEN - Your Network Awaits!`,
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
              <h2>Hi ${data.recipientName}! 👋</h2>
              <p>
                Welcome to the future of networking! GEN is where ambitious professionals, 
                entrepreneurs, and innovators come together to build meaningful connections 
                that matter.
              </p>
            </div>

            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-number">${data.communityStats?.totalUsers || '2,500'}+</div>
                <div class="stat-label">Active Members</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">${data.communityStats?.eventsThisMonth || '15'}</div>
                <div class="stat-label">Events This Month</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">${data.communityStats?.connectionsMade || '1,200'}+</div>
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
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3030'}/profile" class="cta-button">
                Complete Your Profile
              </a>
              <br>
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3030'}/home" class="secondary-button">
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
    text: `Welcome to GEN, ${data.recipientName}!\n\nYour journey to meaningful connections starts here. Join ${data.communityStats?.totalUsers || '2,500'}+ active members in building the network that matters.\n\nWhat makes GEN special:\n• Smart AI-powered matching\n• Exclusive networking events\n• Verified professional profiles\n• Quality over quantity connections\n\nComplete your profile: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3030'}/profile\nExplore the community: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3030'}/home\n\nJoin the GEN Revolution - Where Connections Matter!\n\nThe GEN Team`
  })
};

// Email Service Functions
export class EmailService {
  static async sendProfileLikeNotification(
    recipient: EmailRecipient,
    data: ProfileLikeEmailData
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const template = emailTemplates.profileLike(data);
      
      const result = await resend.emails.send({
        from: 'GEN <notifications@gen.app>',
        to: [recipient.email],
        subject: template.subject,
        html: template.html,
        text: template.text,
      });

      console.log('✅ Profile like email sent:', result);
      return { success: true };
    } catch (error) {
      console.error('❌ Failed to send profile like email:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  static async sendPasswordResetEmail(
    recipient: EmailRecipient,
    data: PasswordResetEmailData
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const template = emailTemplates.passwordReset(data);
      
      const result = await resend.emails.send({
        from: 'GEN <security@gen.app>',
        to: [recipient.email],
        subject: template.subject,
        html: template.html,
        text: template.text,
      });

      console.log('✅ Password reset email sent:', result);
      return { success: true };
    } catch (error) {
      console.error('❌ Failed to send password reset email:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  static async sendTestEmail(
    recipient: EmailRecipient
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const result = await resend.emails.send({
        from: 'GEN <hello@gen.app>',
        to: [recipient.email],
        subject: '🎉 Welcome to GEN!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #667eea;">Welcome to GEN!</h1>
            <p>Your email service is working perfectly! 🚀</p>
            <p>This is a test email to confirm that Resend is properly configured.</p>
          </div>
        `,
      });

      console.log('✅ Test email sent:', result);
      return { success: true };
    } catch (error) {
      console.error('❌ Failed to send test email:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  static async sendPromotionalEmail(
    recipient: EmailRecipient,
    data: PromotionalEmailData
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const template = emailTemplates.promotional(data);
      
      const result = await resend.emails.send({
        from: 'GEN <welcome@gen.app>',
        to: [recipient.email],
        subject: template.subject,
        html: template.html,
        text: template.text,
      });

      console.log('✅ Promotional email sent:', result);
      return { success: true };
    } catch (error) {
      console.error('❌ Failed to send promotional email:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}
