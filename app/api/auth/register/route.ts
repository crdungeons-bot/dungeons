import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';
import bcrypt from 'bcryptjs';

function validateEmail(email: string): boolean {
    const atIndex = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.');
    if (atIndex === -1 || dotIndex === -1 || atIndex > dotIndex) return false;
    if (atIndex === 0 || dotIndex === email.length - 1) return false;
    return true;
}

function sanitizeInput(input: string): string {
    return input.replace(/<[^>]*>/g, '').trim();
}

function validateRegistrationData(firstName: string, lastName: string, email: string, password: string) {
    const errors: string[] = [];

    if (!firstName || firstName.length < 1 || firstName.length > 50) {
        errors.push('First name must be between 1 and 50 characters');
    }

    if (!lastName || lastName.length < 1 || lastName.length > 50) {
        errors.push('Last name must be between 1 and 50 characters');
    }

    if (!email || !validateEmail(email)) {
        errors.push('Invalid email format');
    }

    if (!password || password.length < 6 || password.length > 100) {
        errors.push('Password must be between 6 and 100 characters');
    }

    return errors;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        let { firstName, lastName, email, password } = body;

        firstName = sanitizeInput(firstName);
        lastName = sanitizeInput(lastName);
        email = sanitizeInput(email).toLowerCase();

        const validationErrors = validateRegistrationData(firstName, lastName, email, password);
        if (validationErrors.length > 0) {
            return NextResponse.json(
                { error: validationErrors.join(', ') },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('dnd-app');
        const usersCollection = db.collection('users');

        // Email is now the unique identifier
        const existingEmail = await usersCollection.findOne({ email });
        if (existingEmail) {
            return NextResponse.json(
                { error: 'An account with this email already exists' },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await usersCollection.insertOne({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        });

        return NextResponse.json({
            success: true,
            user: {
                id: result.insertedId,
                firstName,
                lastName,
                email,
            }
        });
    } catch (error) {
        console.error('Registration error: ', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
