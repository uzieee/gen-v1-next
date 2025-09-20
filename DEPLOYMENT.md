# 🚀 Vercel Deployment Guide

## Prerequisites
- Vercel account (free tier available)
- MongoDB Atlas account (for production database)
- All your API keys ready

## Step 1: Prepare Your Repository

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project**:
   - Framework Preset: `Next.js`
   - Root Directory: `./` (default)
   - Build Command: `npm run build`
   - Output Directory: `.next` (default)

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

## Step 3: Environment Variables

In your Vercel dashboard, go to **Settings > Environment Variables** and add:

### Required Variables:
```
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/gen-v1-next?retryWrites=true&w=majority
PAYLOAD_SECRET=your-super-secret-payload-key-here
PAYLOAD_PUBLIC_SERVER_URL=https://your-app.vercel.app
OPENAI_API_KEY=sk-your-openai-key-here
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=your-twilio-number
RESEND_API_KEY=re_your-resend-key
JWT_SECRET=your-jwt-secret-here
NODE_ENV=production
```

## Step 4: Database Setup

### MongoDB Atlas (Recommended for Production)

1. **Create a MongoDB Atlas account** at [mongodb.com/atlas](https://mongodb.com/atlas)
2. **Create a new cluster** (free tier available)
3. **Create a database user** with read/write permissions
4. **Whitelist all IPs** (0.0.0.0/0) for Vercel
5. **Get your connection string** and use it as `DATABASE_URI`

## Step 5: Domain Configuration

### Custom Domain (Optional)
1. **In Vercel dashboard**, go to **Settings > Domains**
2. **Add your custom domain**
3. **Update DNS records** as instructed
4. **Update `PAYLOAD_PUBLIC_SERVER_URL`** to your custom domain

## Step 6: Post-Deployment Setup

1. **Access your admin panel**: `https://your-app.vercel.app/admin`
2. **Create your first admin user**
3. **Configure your collections** (Users, Events, etc.)
4. **Test all functionality**

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check environment variables are set correctly
   - Ensure all dependencies are in `package.json`

2. **Database Connection Issues**:
   - Verify MongoDB Atlas IP whitelist includes Vercel IPs
   - Check connection string format

3. **API Errors**:
   - Verify all API keys are correct
   - Check rate limits on external services

### Useful Commands:
```bash
# Check build locally
npm run build

# Test production build
npm run start

# View Vercel logs
vercel logs
```

## Performance Optimization

1. **Enable Vercel Analytics** in dashboard
2. **Configure CDN** for static assets
3. **Monitor function execution time**
4. **Set up error tracking** (Sentry, etc.)

## Security Checklist

- [ ] All secrets are in environment variables
- [ ] Database is properly secured
- [ ] API keys have appropriate permissions
- [ ] HTTPS is enabled (automatic on Vercel)
- [ ] CORS is configured correctly

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Payload CMS Deployment](https://payloadcms.com/docs/deployment/overview)
