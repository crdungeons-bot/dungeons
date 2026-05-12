import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';
import { sendEmail, generatePasswordResetEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email || typeof email !== 'string') {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Check if SendGrid is configured
        if (!process.env.SENDGRID_API_KEY) {
            console.error('❌ SENDGRID_API_KEY is not configured');
            return NextResponse.json(
                { error: 'Email service not configured - SENDGRID_API_KEY is missing' },
                { status: 500 }
            );
        }

        if (!process.env.SENDGRID_FROM_EMAIL) {
            console.error('❌ SENDGRID_FROM_EMAIL is not configured');
            return NextResponse.json(
                { error: 'Email service not configured - SENDGRID_FROM_EMAIL is missing' },
                { status: 500 }
            );
        }

        console.log('📧 Processing password reset request for:', email);

        const client = await clientPromise;
        const db = client.db('dnd-app');

        // Find user by email
        const user = await db.collection('users').findOne({ email: email.toLowerCase() });

        // Always return success to prevent email enumeration
        // (Don't reveal whether the email exists or not)
        if (!user) {
            console.log(`⚠️ Password reset requested for non-existent email: ${email}`);
            return NextResponse.json({ 
                success: true,
                message: 'If an account exists with this email, a reset link has been sent.' 
            });
        }

        console.log('✓ User found, generating reset token...');

        // Generate secure reset token (valid for 1 hour)
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
        const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        // Store reset token in database
        await db.collection('users').updateOne(
            { _id: user._id },
            {
                $set: {
                    resetToken: resetTokenHash,
                    resetTokenExpiry: resetTokenExpiry,
                }
            }
        );

        console.log('✓ Reset token stored in database');

        // Generate reset link
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const resetLink = `${baseUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

        console.log('📤 Attempting to send email via SendGrid...');
        console.log('   From:', process.env.SENDGRID_FROM_EMAIL);
        console.log('   To:', email);

        // Send email
        const emailResult = await sendEmail({
            to: email,
            subject: 'Reset Your DND Guru Password',
            html: generatePasswordResetEmail(resetLink, user.firstName || 'Adventurer'),
        });

        if (!emailResult.success) {
            console.error('❌ Failed to send password reset email:', emailResult.error);
            return NextResponse.json(
                { 
                    error: `Failed to send reset email: ${emailResult.error}`,
                    details: 'Check that your sender email is verified in SendGrid'
                },
                { status: 500 }
            );
        }

        console.log('✅ Password reset email sent successfully!');

        return NextResponse.json({ 
            success: true,
            message: 'If an account exists with this email, a reset link has been sent.' 
        });

    } catch (error) {
        console.error('❌ Forgot password error:', error);
        return NextResponse.json(
            { 
                error: 'Failed to process request',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
