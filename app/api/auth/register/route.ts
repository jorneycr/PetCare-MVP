import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword, validateEmail, validatePassword } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password, userType, country, province, canton } = body;

        // Validate input
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate email
        if (!validateEmail(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Validate password
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.valid) {
            return NextResponse.json(
                { error: passwordValidation.errors[0] },
                { status: 400 }
            );
        }

        // Connect to database
        await connectDB();

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            userType: userType || 'owner',
            country: country || 'Costa Rica',
            province,
            canton,
        });

        // Return success (without password)
        return NextResponse.json(
            {
                success: true,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    userType: user.userType,
                    country: user.country,
                    province: user.province,
                    canton: user.canton,
                },
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
