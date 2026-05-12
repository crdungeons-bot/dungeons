# SendGrid Email Setup Guide

This guide walks through setting up SendGrid for sending transactional emails (password resets, party invites, etc.) from your Next.js application.

## Security Note

**Next.js API routes run server-side only.** Your SendGrid API key will never be exposed to the browser. This is the standard, secure way to send emails from Next.js applications.

## Step 1: Create SendGrid Account

1. Go to https://sendgrid.com
2. Click "Start for Free" or "Sign Up"
3. Complete the registration form
4. Verify your email address

**Free Tier Includes:**
- 100 emails/day (forever free)
- Up to 2,000 contacts
- Email API access

## Step 2: Domain Verification (Recommended)

For production use, you should verify your domain to improve deliverability:

1. In SendGrid dashboard, go to **Settings** → **Sender Authentication**
2. Click **Authenticate Your Domain**
3. Follow the wizard to add DNS records to your domain
4. Wait for DNS propagation (can take up to 48 hours)

**For Development:** You can skip this and use "Single Sender Verification" instead:
1. Go to **Settings** → **Sender Authentication** → **Single Sender Verification**
2. Add and verify the email address you want to send from (e.g., `noreply@yourdomain.com`)

## Step 3: Create API Key

1. In SendGrid dashboard, go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Give it a descriptive name: `DND Guru Production` or `DND Guru Development`
4. Select **Restricted Access**
5. Enable only: **Mail Send** → **Full Access**
   - This follows the principle of least privilege
6. Click **Create & View**
7. **COPY THE API KEY NOW** - you'll only see it once!

## Step 4: Configure Environment Variables

### Local Development

Add to your `.env.local` file:

```env
SENDGRID_API_KEY=SG.your_actual_api_key_here
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Production (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `SENDGRID_API_KEY` → Your SendGrid API key
   - `SENDGRID_FROM_EMAIL` → Your verified sender email
   - `NEXT_PUBLIC_BASE_URL` → Your production URL (e.g., `https://dndguru.com`)
4. Select **Production** environment
5. Click **Save**

**Important:** Never commit your `.env.local` file to git. It's already in `.gitignore`.

## Step 5: Install Dependencies

The SendGrid package is already added to your project:

```bash
npm install @sendgrid/mail
```

## Step 6: Test Your Setup

Use the actual password reset pages once they're implemented, or test the API directly:

```bash
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"your-test-email@example.com"}'
```

Expected response:
```json
{
  "success": true,
  "message": "If an account exists with this email, a reset link has been sent."
}
```

## Step 7: Monitor Your Emails

1. Go to SendGrid dashboard → **Activity**
2. You can see:
   - Delivery status
   - Opens and clicks (if enabled)
   - Bounces and errors

## Implemented Features

The following email functionality is ready to use:

### 1. Password Reset Flow

**API Routes:**
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

**Security Features:**
- Secure random token generation
- SHA-256 token hashing (tokens never stored in plain text)
- 1-hour expiration
- No email enumeration (always returns success)

**Next Steps:**
Frontend pages for password reset flow:
- `app/(auth)/forgot-password/page.tsx` - Request reset form ✓
- `app/(auth)/reset-password/page.tsx` - New password form ✓

### 2. Party Invitations

**API Route:**
- `POST /api/party/invite` - Send party invitation

**Security Features:**
- Verifies party membership before sending
- Prevents duplicate invitations
- 7-day expiration
- Secure token generation

**Next Steps:** Create frontend for:
- Sending invites (add to party management page)
- Accepting invites (`app/(app)/party/join/page.tsx`)

## Email Templates

Pre-built templates are in `lib/email.ts`:

- `generatePasswordResetEmail()` - Styled password reset email
- `generatePartyInviteEmail()` - Styled party invitation email

Both templates:
- Match your app's dark theme (gold #d4af37 and dark brown)
- Are mobile-responsive
- Include plain-text fallback for text-only email clients
- Have accessible HTML structure

## Customization

### Change Email Styling

Edit the HTML templates in `lib/email.ts`. The current theme uses:
- Background: `#0a0806` (dark brown)
- Primary: `#d4af37` (gold)
- Text: `#f4e8d0` (cream)

### Add New Email Types

1. Create new template function in `lib/email.ts`:

```typescript
export function generateWelcomeEmail(firstName: string): string {
    return `<!DOCTYPE html>...`;
}
```

2. Call it from your API route:

```typescript
await sendEmail({
    to: email,
    subject: 'Welcome to DND Guru!',
    html: generateWelcomeEmail(user.firstName),
});
```

## Troubleshooting

### "Email service not configured" error
- Verify `SENDGRID_API_KEY` is set in environment variables
- Restart your dev server after adding environment variables

### Emails not being received
1. Check SendGrid dashboard → Activity for delivery status
2. Check spam folder
3. Verify sender email is authenticated in SendGrid
4. Check that the recipient email is valid

### "Invalid API key" error
- Verify you copied the entire API key (starts with `SG.`)
- Make sure you created a key with Mail Send permissions
- Try creating a new API key

### Rate limiting
- Free tier: 100 emails/day
- If you need more, upgrade to a paid plan ($19.95/month for 50k emails)

## Best Practices

1. **Never log API keys** - They're sensitive credentials
2. **Use templates** - Keep email HTML in reusable functions
3. **Monitor deliverability** - Check SendGrid dashboard regularly
4. **Handle failures gracefully** - Always have user-friendly error messages
5. **Test before deploying** - Send test emails in development
6. **Set up domain authentication** - Required for production use
7. **Respect unsubscribes** - Implement unsubscribe links for marketing emails (not needed for transactional emails like password resets)

## Next Steps

1. ✅ SendGrid account created
2. ✅ API key added to environment variables
3. ✅ Email utility functions created
4. ✅ API routes implemented
5. ⏳ Create frontend forms for password reset
6. ⏳ Create frontend for party invites
7. ⏳ Test in development
8. ⏳ Deploy to production
9. ⏳ Verify domain in SendGrid for production

## Need Help?

- SendGrid Documentation: https://docs.sendgrid.com/
- SendGrid API Reference: https://docs.sendgrid.com/api-reference/mail-send/mail-send
- Next.js API Routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
