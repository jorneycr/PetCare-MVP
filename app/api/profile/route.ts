import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

import Sitter from '@/models/Sitter';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        await connectDB();

        const user = await User.findOne({ email: session.user.email }).select('-password').lean();

        if (!user) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        let sitter = null;
        if (user.userType === 'sitter' || user.userType === 'both') {
            sitter = await Sitter.findOne({ userId: user._id }).lean();
        }

        return NextResponse.json({ user, sitter });
    } catch (error: any) {
        console.error('Error fetching profile:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const body = await req.json();
        const {
            name, country, province, canton, userType,
            bio, age, experienceYears, ownPets, skills, services
        } = body;

        await connectDB();

        // Find user first
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        // Update User
        if (name) user.name = name;
        if (country) user.country = country;
        if (province) user.province = province;
        if (canton) user.canton = canton;
        if (userType) user.userType = userType;
        await user.save();

        // Update or Create Sitter if applicable
        let sitterData = null;
        if (user.userType === 'sitter' || user.userType === 'both') {
            const locationStr = `${canton || user.canton}, ${province || user.province}`;

            const sitterUpdate: any = {
                location: locationStr,
                name: user.name,
            };

            if (bio !== undefined) sitterUpdate.bio = bio;
            if (age !== undefined) sitterUpdate.age = age;
            if (experienceYears !== undefined) sitterUpdate.experienceYears = experienceYears;
            if (ownPets !== undefined) sitterUpdate.ownPets = ownPets;
            if (skills !== undefined) sitterUpdate.skills = skills;
            if (services !== undefined) sitterUpdate.services = services;

            sitterData = await Sitter.findOneAndUpdate(
                { userId: user._id },
                { $set: sitterUpdate },
                { new: true, upsert: true }
            );
        }

        return NextResponse.json({
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
            sitter: sitterData
        });
    } catch (error: any) {
        console.error('Error updating profile:', error);
        return NextResponse.json({ error: 'Error al actualizar el perfil' }, { status: 500 });
    }
}
