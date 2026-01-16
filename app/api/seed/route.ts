import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Sitter from '@/models/Sitter';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';

// Seed data for testing
export async function POST() {
    try {
        await connectDB();

        // Create test users and sitters
        const testData = [
            {
                name: 'Ana María G.',
                email: 'ana@petcare.com',
                password: 'password123',
                bio: 'Amante de los animales con 5 años de experiencia. Tengo un patio grande y seguro donde tus peluditos pueden jugar todo el día.',
                location: 'Escazú, San José',
                services: [
                    { type: 'boarding', price: 12000 },
                    { type: 'daycare', price: 10000 },
                ],
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop',
                badge: 'Verificado',
                verifications: ['email', 'mobile', 'id'],
            },
            {
                name: 'Carlos R.',
                email: 'carlos@petcare.com',
                password: 'password123',
                bio: 'Excelente con perros de todas las razas y tamaños. Paseos diarios y mucho amor garantizado.',
                location: 'San Pedro, Montes de Oca',
                services: [
                    { type: 'walking', price: 5000 },
                    { type: 'visits', price: 4500 },
                ],
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop',
                badge: 'Premium',
                verifications: ['email', 'mobile', 'facebook'],
            },
            {
                name: 'Elena & Pablo',
                email: 'elena@petcare.com',
                password: 'password123',
                bio: 'Somos una pareja que ama a los gatos. Ofrecemos un ambiente tranquilo y seguro para tu felino.',
                location: 'Heredia Centro',
                services: [
                    { type: 'boarding', price: 8000 },
                    { type: 'visits', price: 5000 },
                    { type: 'taxi', price: 8000 },
                ],
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&h=256&fit=crop',
                badge: '',
                verifications: ['email', 'id'],
            },
            {
                name: 'Graciela Z.',
                email: 'graciela@petcare.com',
                password: 'password123',
                bio: 'Hola soy Graciela Zamora, tengo 28 años y toda mi vida he tenido perritos... amo estar cerca de ellos y darles todo lo mejor! He tenido 3 perritos a lo largo de mi vida... tuve una french pool por 17 años y un Pug por casi 9 años y actualmente tengo un chihuahuita de 2 añitos 🐶💖 todos se han robado mi corazon',
                aboutSummary: 'Soy super cariñosa con los peluditos, voy a chinearlos todo el tiempo que estén conmigo y me asegurare de que coman a sus respectivas horas y que den un paseen diario...',
                age: 28,
                experienceYears: 10,
                ownPets: '1 Chihuahua (2 años)',
                skills: ['Experiencia en entrenamiento', 'Primeros auxilios básicos'],
                location: 'San Pablo, Heredia',
                services: [
                    { type: 'visits', price: 5000 },
                    { type: 'walking', price: 4500 },
                    { type: 'daycare', price: 10000 },
                ],
                acceptedPetTypes: ['Perros'],
                acceptedPetSizes: ['Pequeño (1-5kg)', 'Mediano (5-10kg)', 'Grande (10-20kg)'],
                supervisionLevel: 'Supervisión constante (max 1 hora solo)',
                pottyBreaks: 'Acceso total al exterior',
                walksPerDay: '3+',
                emergencyTransport: true,
                lastMinuteBookings: true,
                image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&fit=crop',
                badge: 'Premium',
                verifications: ['email', 'mobile', 'id', 'facebook', 'google', 'business', 'training'],
            },
            {
                name: 'Sofía M.',
                email: 'sofia@petcare.com',
                password: 'password123',
                bio: 'Veterinaria graduada con especialidad en comportamiento animal. Ofrezco un ambiente seguro y profesional para que tu mascota se sienta como en casa. Tengo amplio conocimiento en cuidados médicos si tu mascota lo requiere.',
                aboutSummary: 'Especialista en comportamiento y cuidados médicos.',
                age: 32,
                experienceYears: 12,
                ownPets: '2 Labradores',
                skills: ['Veterinaria', 'Reanimación RCP', 'Administración de medicamentos'],
                location: 'Curridabat, San José',
                services: [
                    { type: 'boarding', price: 15000 },
                    { type: 'daycare', price: 12000 },
                    { type: 'visits', price: 6000 },
                    { type: 'grooming', price: 20000 },
                    { type: 'training', price: 25000 },
                ],
                acceptedPetTypes: ['Perros', 'Gatos'],
                acceptedPetSizes: ['Pequeño', 'Mediano', 'Grande', 'Gigante'],
                supervisionLevel: 'Supervisión 24/7',
                pottyBreaks: 'Cada 2-3 horas',
                walksPerDay: '2',
                emergencyTransport: true,
                lastMinuteBookings: false,
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&h=256&fit=crop',
                badge: 'Veterinario',
                verifications: ['email', 'mobile', 'id', 'google', 'business', 'medical'],
            },
        ];

        const createdSitters = [];

        for (const data of testData) {
            // Check if user already exists
            let user = await User.findOne({ email: data.email });

            if (!user) {
                // Create user
                const hashedPassword = await hashPassword(data.password);
                user = await User.create({
                    name: data.name,
                    email: data.email,
                    password: hashedPassword,
                    userType: 'sitter',
                });
            }

            // Update or create sitter profile
            const sitter = await Sitter.findOneAndUpdate(
                { userId: user._id },
                {
                    userId: user._id,
                    bio: data.bio,
                    location: data.location,
                    services: data.services,
                    image: data.image,
                    badge: data.badge,
                    completedBookings: Math.floor(Math.random() * 20) + 10,
                    repeatCustomers: Math.floor(Math.random() * 5) + 2,
                    payments: ['visa', 'mastercard', 'paypal', 'sinpe'],
                    verifications: data.verifications || ['email', 'mobile', 'id', 'facebook', 'google'],
                    // Only set rating/reviews if it's a new profile
                    $setOnInsert: {
                        rating: 4.5 + Math.random() * 0.5,
                        reviewCount: Math.floor(Math.random() * 50) + 10,
                    }
                },
                { upsert: true, new: true }
            );

            createdSitters.push(sitter);
        }

        return NextResponse.json({
            success: true,
            message: `Seeded ${createdSitters.length} sitters successfully`,
            sitters: createdSitters,
        });
    } catch (error: any) {
        console.error('Seed error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to seed data' },
            { status: 500 }
        );
    }
}
