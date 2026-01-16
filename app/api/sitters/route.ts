import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Sitter from '@/models/Sitter';
import User from '@/models/User';

// GET /api/sitters - Get all sitters with optional filters
export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const serviceType = searchParams.get('service');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const location = searchParams.get('location');

        // Build query
        const query: any = {};

        if (serviceType) {
            query['services.type'] = serviceType;
        }

        if (minPrice || maxPrice) {
            query['services.price'] = {};
            if (minPrice) query['services.price'].$gte = parseInt(minPrice);
            if (maxPrice) query['services.price'].$lte = parseInt(maxPrice);
        }

        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        // Fetch sitters and populate user data
        const sitters = await Sitter.find(query)
            .populate('userId', 'name email')
            .sort({ rating: -1, reviewCount: -1 })
            .lean();

        // Transform data for frontend
        const transformedSitters = sitters.map((sitter: any) => ({
            id: sitter._id.toString(),
            name: sitter.userId?.name || 'Unknown',
            rating: sitter.rating,
            reviews: sitter.reviewCount,
            location: sitter.location,
            services: sitter.services,
            bio: sitter.bio,
            image: sitter.image,
            badge: sitter.badge,
        }));

        return NextResponse.json({
            success: true,
            sitters: transformedSitters,
            count: transformedSitters.length,
        });
    } catch (error: any) {
        console.error('Get sitters error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch sitters' },
            { status: 500 }
        );
    }
}

// POST /api/sitters - Create sitter profile (requires authentication)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, bio, location, services, image, badge } = body;

        // Validate required fields
        if (!userId || !bio || !location || !services || services.length === 0) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        await connectDB();

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Check if sitter profile already exists
        const existingSitter = await Sitter.findOne({ userId });
        if (existingSitter) {
            return NextResponse.json(
                { error: 'Sitter profile already exists for this user' },
                { status: 409 }
            );
        }

        // Create sitter profile
        const sitter = await Sitter.create({
            userId,
            bio,
            location,
            services,
            image: image || undefined,
            badge: badge || '',
        });

        return NextResponse.json(
            {
                success: true,
                sitter: {
                    id: sitter._id,
                    userId: sitter.userId,
                    bio: sitter.bio,
                    location: sitter.location,
                    services: sitter.services,
                },
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Create sitter error:', error);
        return NextResponse.json(
            { error: 'Failed to create sitter profile' },
            { status: 500 }
        );
    }
}
