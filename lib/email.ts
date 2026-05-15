import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@tabletopguru.com';

export type EmailTemplate = 'password-reset' | 'party-invite' | 'welcome';

interface EmailData {
    to: string;
    subject: string;
    html: string;
    text?: string;
}

/**
 * Send an email via SendGrid
 * This function should ONLY be called from API routes (server-side)
 */
export async function sendEmail(data: EmailData): Promise<{ success: boolean; error?: string }> {
    // Verify SendGrid is configured
    if (!process.env.SENDGRID_API_KEY) {
        console.error('❌ SENDGRID_API_KEY is not configured');
        return { success: false, error: 'Email service not configured - API key missing' };
    }

    if (!process.env.SENDGRID_FROM_EMAIL) {
        console.error('❌ SENDGRID_FROM_EMAIL is not configured');
        return { success: false, error: 'Email service not configured - from email missing' };
    }

    try {
        console.log('📧 SendGrid: Preparing to send email...');
        console.log('   API Key:', process.env.SENDGRID_API_KEY.substring(0, 10) + '...');
        console.log('   From:', FROM_EMAIL);
        console.log('   To:', data.to);
        console.log('   Subject:', data.subject);

        await sgMail.send({
            to: data.to,
            from: FROM_EMAIL,
            subject: data.subject,
            html: data.html,
            text: data.text || stripHtml(data.html),
        });

        console.log('✅ SendGrid: Email sent successfully!');
        return { success: true };
    } catch (error: any) {
        console.error('❌ SendGrid error:', error);
        
        // Extract detailed error from SendGrid
        let errorMessage = 'Failed to send email';
        
        if (error.response) {
            console.error('   Status:', error.response.statusCode);
            console.error('   Body:', JSON.stringify(error.response.body, null, 2));
            
            if (error.response.body?.errors) {
                errorMessage = error.response.body.errors.map((e: any) => e.message).join(', ');
            }
        }
        
        if (error.message) {
            console.error('   Message:', error.message);
            errorMessage = error.message;
        }
        
        return { 
            success: false, 
            error: errorMessage
        };
    }
}

/**
 * Generate password reset email HTML
 */
export function generatePasswordResetEmail(resetLink: string, firstName: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset - Tabletop Guru</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0806; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #d4af37; font-size: 32px; margin: 0;">⚔️ Tabletop Guru</h1>
            <p style="color: #f4e8d0; opacity: 0.6; margin: 10px 0 0; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase;">Password Reset Request</p>
        </div>

        <!-- Content Card -->
        <div style="background-color: #1a1614; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 8px; padding: 40px 30px;">
            <p style="color: #f4e8d0; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Greetings, ${firstName}!
            </p>
            
            <p style="color: #f4e8d0; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                We received a request to reset your password for your Tabletop Guru account. Click the button below to create a new password:
            </p>

            <!-- Reset Button -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" style="display: inline-block; background: linear-gradient(135deg, #c9a227 0%, #e8c84a 50%, #c9a227 100%); color: #1a1000; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 700; font-size: 16px; letter-spacing: 0.05em;">
                    Reset Password
                </a>
            </div>

            <p style="color: rgba(244, 232, 208, 0.7); font-size: 14px; line-height: 1.6; margin: 20px 0 0;">
                This link will expire in <strong style="color: #d4af37;">1 hour</strong>. If you didn't request a password reset, you can safely ignore this email.
            </p>

            <p style="color: rgba(244, 232, 208, 0.5); font-size: 13px; line-height: 1.6; margin: 30px 0 0; padding-top: 20px; border-top: 1px solid rgba(212, 175, 55, 0.15);">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <span style="color: #d4af37; word-break: break-all;">${resetLink}</span>
            </p>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 30px;">
            <p style="color: rgba(244, 232, 208, 0.4); font-size: 12px; line-height: 1.5;">
                Tabletop Guru - Your 5E Character Manager<br>
                This is an automated message, please do not reply.
            </p>
        </div>
    </div>
</body>
</html>
    `.trim();
}

/**
 * Generate party invite email HTML
 */
export function generatePartyInviteEmail(
    inviteLink: string,
    partyName: string,
    inviterName: string,
    recipientName: string
): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Party Invitation - Tabletop Guru</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0806; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #d4af37; font-size: 32px; margin: 0;">⚔️ Tabletop Guru</h1>
            <p style="color: #f4e8d0; opacity: 0.6; margin: 10px 0 0; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase;">Party Invitation</p>
        </div>

        <!-- Content Card -->
        <div style="background-color: #1a1614; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 8px; padding: 40px 30px;">
            <p style="color: #f4e8d0; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Greetings, ${recipientName}!
            </p>
            
            <p style="color: #f4e8d0; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                <strong style="color: #d4af37;">${inviterName}</strong> has invited you to join their adventuring party: <strong style="color: #d4af37;">${partyName}</strong>
            </p>

            <p style="color: #f4e8d0; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Unite your heroes, share your journey, and embark on epic quests together!
            </p>

            <!-- Join Button -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="${inviteLink}" style="display: inline-block; background: linear-gradient(135deg, #c9a227 0%, #e8c84a 50%, #c9a227 100%); color: #1a1000; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 700; font-size: 16px; letter-spacing: 0.05em;">
                    Join Party
                </a>
            </div>

            <p style="color: rgba(244, 232, 208, 0.7); font-size: 14px; line-height: 1.6; margin: 20px 0 0;">
                This invitation will remain active until accepted or declined.
            </p>

            <p style="color: rgba(244, 232, 208, 0.5); font-size: 13px; line-height: 1.6; margin: 30px 0 0; padding-top: 20px; border-top: 1px solid rgba(212, 175, 55, 0.15);">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <span style="color: #d4af37; word-break: break-all;">${inviteLink}</span>
            </p>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 30px;">
            <p style="color: rgba(244, 232, 208, 0.4); font-size: 12px; line-height: 1.5;">
                Tabletop Guru - Your 5E Character Manager<br>
                This is an automated message, please do not reply.
            </p>
        </div>
    </div>
</body>
</html>
    `.trim();
}

/**
 * Strip HTML tags for plain text version
 */
function stripHtml(html: string): string {
    return html
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}
