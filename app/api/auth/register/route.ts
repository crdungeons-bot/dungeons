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

// Detect gibberish/random strings (common in bot submissions)
function isGibberish(text: string): boolean {
    // Check for excessive uppercase/lowercase mixing
    const upperCount = (text.match(/[A-Z]/g) || []).length;
    const lowerCount = (text.match(/[a-z]/g) || []).length;
    const totalLetters = upperCount + lowerCount;
    
    if (totalLetters > 0) {
        const mixedCaseRatio = Math.min(upperCount, lowerCount) / totalLetters;
        // If more than 40% mixed case (like "zXFHYVcAAOlMqDJxIcFC"), likely gibberish
        if (mixedCaseRatio > 0.4 && text.length > 5) return true;
    }
    
    // Check for lack of vowels (common in random strings)
    const vowelCount = (text.match(/[aeiouAEIOU]/g) || []).length;
    const vowelRatio = vowelCount / text.length;
    if (text.length > 5 && vowelRatio < 0.15) return true;
    
    // Check for excessive consonant clusters (4+ in a row)
    if (/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]{4,}/.test(text)) return true;
    
    return false;
}

// Detect suspicious email patterns
function isSuspiciousEmail(email: string): boolean {
    const localPart = email.split('@')[0];
    
    // Check for excessive dots in local part (like "e.v.u.wu.d.u.2.3.4")
    const dotCount = (localPart.match(/\./g) || []).length;
    if (dotCount > 3) return true;
    
    // Check for very short segments between dots
    const segments = localPart.split('.');
    const hasVeryShortSegments = segments.some(seg => seg.length === 1);
    if (hasVeryShortSegments && segments.length > 4) return true;
    
    return false;
}

function validateRegistrationData(firstName: string, lastName: string, email: string, password: string) {
    const errors: string[] = [];

    if (!firstName || firstName.length < 1 || firstName.length > 50) {
        errors.push('First name must be between 1 and 50 characters');
    }
    
    if (isGibberish(firstName)) {
        errors.push('First name appears to be invalid');
    }

    if (!lastName || lastName.length < 1 || lastName.length > 50) {
        errors.push('Last name must be between 1 and 50 characters');
    }
    
    if (isGibberish(lastName)) {
        errors.push('Last name appears to be invalid');
    }

    if (!email || !validateEmail(email)) {
        errors.push('Invalid email format');
    }
    
    if (isSuspiciousEmail(email)) {
        errors.push('Email address appears to be invalid');
    }

    if (!password || password.length < 6 || password.length > 100) {
        errors.push('Password must be between 6 and 100 characters');
    }

    return errors;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        let { firstName, lastName, email, password, humanCheck, timestamp } = body;

        // Check human verification
        if (!humanCheck) {
            return NextResponse.json(
                { error: 'Human verification required' },
                { status: 400 }
            );
        }

        // Check timing (form should take at least 2 seconds to fill)
        if (timestamp && (Date.now() - timestamp) < 2000) {
            return NextResponse.json(
                { error: 'Form submitted too quickly' },
                { status: 400 }
            );
        }

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
                { error: 'This email is already registered. Please login to your existing account.' },
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
