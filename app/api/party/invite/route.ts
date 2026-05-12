import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';
import { sendEmail, generatePartyInviteEmail } from '@/lib/email';
import { ObjectId } from 'mongodb';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const { partyId, inviteeEmail, inviterUserId } = await request.json();

        if (!partyId || !inviteeEmail || !inviterUserId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('dnd-app');

        // Verify party exists and inviter is a member
        const party = await db.collection('parties').findOne({
            _id: new ObjectId(partyId),
            'members.userId': inviterUserId,
        });

        if (!party) {
            return NextResponse.json(
                { error: 'Party not found or you are not a member' },
                { status: 404 }
            );
        }

        // Get inviter details
        const inviter = await db.collection('users').findOne({
            _id: new ObjectId(inviterUserId),
        });

        if (!inviter) {
            return NextResponse.json(
                { error: 'Inviter not found' },
                { status: 404 }
            );
        }

        // Check if invitee already has an account
        const invitee = await db.collection('users').findOne({
            email: inviteeEmail.toLowerCase(),
        });

        // Check if already a member
        const isAlreadyMember = party.members?.some(
            (m: any) => m.userId === invitee?._id.toString()
        );

        if (isAlreadyMember) {
            return NextResponse.json(
                { error: 'This user is already a party member' },
                { status: 400 }
            );
        }

        // Generate invite token
        const inviteToken = crypto.randomBytes(32).toString('hex');
        const inviteExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        // Store invitation
        await db.collection('party_invites').insertOne({
            partyId: new ObjectId(partyId),
            partyName: party.name,
            invitedBy: new ObjectId(inviterUserId),
            invitedEmail: inviteeEmail.toLowerCase(),
            invitedUserId: invitee?._id || null,
            inviteToken: inviteToken,
            expiresAt: inviteExpiry,
            status: 'pending',
            createdAt: new Date(),
        });

        // Generate invite link
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const inviteLink = `${baseUrl}/party/join?token=${inviteToken}`;

        // Send email
        const emailResult = await sendEmail({
            to: inviteeEmail,
            subject: `You've been invited to join ${party.name}!`,
            html: generatePartyInviteEmail(
                inviteLink,
                party.name,
                inviter.firstName || 'A fellow adventurer',
                invitee?.firstName || 'Adventurer'
            ),
        });

        if (!emailResult.success) {
            console.error('Failed to send party invite email:', emailResult.error);
            return NextResponse.json(
                { error: 'Failed to send invitation email' },
                { status: 500 }
            );
        }

        return NextResponse.json({ 
            success: true,
            message: 'Invitation sent successfully' 
        });

    } catch (error) {
        console.error('Send party invite error:', error);
        return NextResponse.json(
            { error: 'Failed to send invitation' },
            { status: 500 }
        );
    }
}
