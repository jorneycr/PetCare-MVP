import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Sitter from '@/models/Sitter';

export async function GET() {
    try {
        // Test database connection
        await connectDB();

        // Count documents
        const userCount = await User.countDocuments();
        const sitterCount = await Sitter.countDocuments();

        return NextResponse.json({
            success: true,
            message: 'Database connected successfully!',
            stats: {
                users: userCount,
                sitters: sitterCount,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error: any) {
        console.error('Database connection test failed:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Database connection failed',
            },
            { status: 500 }
        );
    }
}
