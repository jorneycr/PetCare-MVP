import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';
import Sitter from '@/models/Sitter';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Debes iniciar sesión para dejar una reseña' }, { status: 401 });
        }

        const { sitterId, rating, comment } = await req.json();

        if (!sitterId || !rating || !comment) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        await connectDB();

        // Check if sitter exists
        const sitter = await Sitter.findById(sitterId);
        if (!sitter) {
            return NextResponse.json({ error: 'Cuidador no encontrado' }, { status: 404 });
        }

        // Get user from DB to verify location info if needed
        const dbUser = await User.findOne({ email: session.user.email });
        if (!dbUser) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        // Create the review
        const review = await Review.create({
            sitterId,
            userId: dbUser._id,
            rating,
            comment,
            isVerified: true, // For MVP we can set this as true if they are logged in
        });

        // Update sitter rating and review count
        const allReviews = await Review.find({ sitterId });
        const reviewCount = allReviews.length;
        const avgRating = allReviews.reduce((acc, curr) => acc + curr.rating, 0) / reviewCount;

        await Sitter.findByIdAndUpdate(sitterId, {
            rating: avgRating,
            reviewCount: reviewCount,
        });

        return NextResponse.json({
            success: true,
            review,
        });
    } catch (error: any) {
        console.error('Review submission error:', error);
        return NextResponse.json({ error: 'Error al enviar la reseña' }, { status: 500 });
    }
}
