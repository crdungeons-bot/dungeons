import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const { token, email, newPassword } = await request.json();

        if (!token || !email || !newPassword) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (newPassword.length < 8) {
            return NextResponse.json(
                { error: 'Password must be at least 8 characters' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('dnd-app');

        // Hash the token to compare with stored hash
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

        // Find user with valid reset token
        const user = await db.collection('users').findOne({
            email: email.toLowerCase(),
            resetToken: tokenHash,
            resetTokenExpiry: { $gt: new Date() }, // Token hasn't expired
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid or expired reset token' },
                { status: 400 }
            );
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password and clear reset token
        await db.collection('users').updateOne(
            { _id: user._id },
            {
                $set: {
                    password: hashedPassword,
                },
                $unset: {
                    resetToken: '',
                    resetTokenExpiry: '',
                }
            }
        );

        return NextResponse.json({ 
            success: true,
            message: 'Password has been reset successfully' 
        });

    } catch (error) {
        console.error('Reset password error:', error);
        return NextResponse.json(
            { error: 'Failed to reset password' },
            { status: 500 }
        );
    }
}
