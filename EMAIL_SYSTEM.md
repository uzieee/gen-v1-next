# 📧 GEN Email Notification System

A comprehensive email notification system built with Resend, featuring beautiful HTML templates and automated triggers.

## 🚀 Features

- **Profile Like Notifications** - Beautiful emails when someone likes your profile
- **Password Reset** - Secure password reset with branded emails
- **Email Preferences** - User-controlled notification settings
- **Admin Dashboard** - Test and manage email system
- **Responsive Templates** - Mobile-friendly email designs

## 🛠 Setup Instructions

### 1. Get Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Create a new API key in your dashboard
3. Copy the API key

### 2. Configure Environment Variables

Add to your `.env` file:

```bash
# Resend (for email notifications)
RESEND_API_KEY=re_your_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3030
```

### 3. Verify Your Domain (Production)

1. In Resend dashboard, add your domain
2. Add the required DNS records
3. Verify domain ownership

## 📁 File Structure

```
src/
├── lib/
│   └── email.ts                 # Email service and templates
├── app/
│   ├── actions/
│   │   └── password-reset.ts    # Password reset actions
│   ├── (app)/
│   │   ├── reset-password/      # Password reset page
│   │   ├── email-preferences/   # User email settings
│   │   └── admin/
│   │       └── email-test/      # Admin email testing
│   └── api/
│       └── test-email/          # Email testing API
└── collections/
    └── PasswordResetTokens.ts   # Password reset tokens
```

## 🎨 Email Templates

### Profile Like Notification
- **Trigger**: When someone likes a user's profile
- **Features**: 
  - Beautiful gradient header
  - Liker's profile image
  - Call-to-action buttons
  - Mobile responsive design

### Password Reset
- **Trigger**: When user requests password reset
- **Features**:
  - Security-focused design
  - Expiration warnings
  - Clear instructions
  - Branded styling

## 🔧 Usage Examples

### Send Profile Like Email

```typescript
import { EmailService } from "@/lib/email";

await EmailService.sendProfileLikeNotification(
  {
    email: "user@example.com",
    name: "John Doe",
  },
  {
    recipientName: "John Doe",
    likerName: "Jane Smith",
    likerProfileImage: "https://example.com/avatar.jpg",
    profileUrl: "https://app.com/profile",
    likerProfileUrl: "https://app.com/profile/jane",
  }
);
```

### Send Password Reset Email

```typescript
import { EmailService } from "@/lib/email";

await EmailService.sendPasswordResetEmail(
  {
    email: "user@example.com",
    name: "John Doe",
  },
  {
    recipientName: "John Doe",
    resetUrl: "https://app.com/reset-password?token=abc123",
    expiresIn: "24 hours",
  }
);
```

## 👤 User Email Preferences

Users can manage their email preferences at `/email-preferences`:

- **Profile Likes** - Notifications when someone likes their profile
- **Event Reminders** - Reminders for upcoming events
- **Round Table Invites** - Invitations to discussions
- **Newsletter** - Marketing and updates

## 🔐 Password Reset Flow

1. User requests password reset at `/reset-password`
2. System generates secure token (24-hour expiry)
3. Email sent with reset link
4. User clicks link and sets new password
5. Token is invalidated after use

## 🧪 Testing

### Admin Email Test Page

Visit `/admin/email-test` (admin only) to:
- Send test emails
- Test different email types
- Verify email delivery
- Debug email issues

### API Testing

```bash
curl -X POST http://localhost:3030/api/test-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "type": "profile-like"
  }'
```

## 🎯 Email Types

| Type | Description | Trigger |
|------|-------------|---------|
| `test` | Simple test email | Manual testing |
| `profile-like` | Profile like notification | User likes profile |
| `password-reset` | Password reset email | User requests reset |

## 🔧 Configuration

### Email Service Settings

```typescript
// In src/lib/email.ts
const resend = new Resend(process.env.RESEND_API_KEY);

// Email addresses
from: 'GEN <notifications@gen.app>'  // Profile likes
from: 'GEN <security@gen.app>'       // Password reset
from: 'GEN <hello@gen.app>'          // Test emails
```

### Template Customization

Templates are defined in `src/lib/email.ts` with:
- Inline CSS for maximum compatibility
- Responsive design
- Brand colors and fonts
- Accessibility features

## 🚨 Error Handling

The system includes comprehensive error handling:

- **Email failures don't break core functionality**
- **Detailed error logging**
- **Graceful fallbacks**
- **User-friendly error messages**

## 📊 Monitoring

Monitor email delivery through:
- Resend dashboard analytics
- Application logs
- User feedback
- Email preference changes

## 🔒 Security Features

- **Secure token generation** for password reset
- **Token expiration** (24 hours)
- **One-time use tokens**
- **Rate limiting** on reset requests
- **No email enumeration** (same response for valid/invalid emails)

## 🎨 Design System

### Colors
- Primary: `#667eea` (Blue gradient)
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Yellow)
- Error: `#ef4444` (Red)

### Typography
- Headers: Arial, system fonts
- Body: Chivo, system fonts
- Font weights: 400, 500, 600, 700

### Layout
- Max width: 600px
- Padding: 30px
- Border radius: 16px
- Box shadow: Subtle elevation

## 🚀 Deployment Checklist

- [ ] Add Resend API key to environment variables
- [ ] Verify domain in Resend dashboard
- [ ] Test email delivery in staging
- [ ] Configure DNS records for production domain
- [ ] Set up email monitoring
- [ ] Test all email types
- [ ] Verify unsubscribe functionality

## 📞 Support

For issues with the email system:
1. Check Resend dashboard for delivery status
2. Review application logs
3. Test with admin email test page
4. Verify environment variables
5. Check domain verification status

---

**Built with ❤️ using Resend and Next.js**
