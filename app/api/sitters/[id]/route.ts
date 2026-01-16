import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Sitter from '@/models/Sitter';

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

// GET /api/sitters/[id] - Get single sitter by ID
export async function GET(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;

        await connectDB();

        const sitter = await Sitter.findById(id)
            .populate('userId', 'name email')
            .lean();

        if (!sitter) {
            return NextResponse.json(
                { error: 'Sitter not found' },
                { status: 404 }
            );
        }

        // Transform data
        const transformedSitter = {
            id: (sitter as any)._id.toString(),
            name: (sitter as any).userId?.name || 'Unknown',
            rating: (sitter as any).rating,
            reviews: (sitter as any).reviewCount,
            location: (sitter as any).location,
            services: (sitter as any).services,
            bio: (sitter as any).bio,
            image: (sitter as any).image,
            badge: (sitter as any).badge,
        };

        return NextResponse.json({
            success: true,
            sitter: transformedSitter,
        });
    } catch (error: any) {
        console.error('Get sitter error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch sitter' },
            { status: 500 }
        );
    }
}

// PUT /api/sitters/[id] - Update sitter profile
export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { bio, location, services, image, badge } = body;

        await connectDB();

        const sitter = await Sitter.findById(id);
        if (!sitter) {
            return NextResponse.json(
                { error: 'Sitter not found' },
                { status: 404 }
            );
        }

        // Update fields
        if (bio) sitter.bio = bio;
        if (location) sitter.location = location;
        if (services) sitter.services = services;
        if (image) sitter.image = image;
        if (badge !== undefined) sitter.badge = badge;

        await sitter.save();

        return NextResponse.json({
            success: true,
            sitter: {
                id: sitter._id,
                bio: sitter.bio,
                location: sitter.location,
                services: sitter.services,
            },
        });
    } catch (error: any) {
        console.error('Update sitter error:', error);
        return NextResponse.json(
            { error: 'Failed to update sitter' },
            { status: 500 }
        );
    }
}

// DELETE /api/sitters/[id] - Delete sitter profile
export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;

        await connectDB();

        const sitter = await Sitter.findByIdAndDelete(id);
        if (!sitter) {
            return NextResponse.json(
                { error: 'Sitter not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Sitter profile deleted successfully',
        });
    } catch (error: any) {
        console.error('Delete sitter error:', error);
        return NextResponse.json(
            { error: 'Failed to delete sitter' },
            { status: 500 }
        );
    }
}
