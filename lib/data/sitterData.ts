export interface Sitter {
    id: string;
    name: string;
    rating: number;
    reviews: number;
    location: string;
    services: {
        type: 'boarding' | 'walking' | 'daycare' | 'visits' | 'taxi' | 'grooming' | 'training';
        price: number;
    }[];
    bio: string;
    image: string;
    badge?: string;
}

// Fix typo
export const MOCK_SITTERS: Sitter[] = [
    {
        id: '1',
        name: 'Ana María G.',
        rating: 4.9,
        reviews: 124,
        location: 'Escazú, San José',
        services: [
            { type: 'boarding', price: 15000 },
            { type: 'daycare', price: 10000 },
        ],
        bio: 'Amante de los animales con 5 años de experiencia. Tengo un patio grande y seguro donde tus peludos pueden jugar todo el día.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        badge: 'Premium',
    },
    {
        id: '2',
        name: 'Carlos R.',
        rating: 5.0,
        reviews: 45,
        location: 'San Pedro, Montes de Oca',
        services: [
            { type: 'walking', price: 5000 },
            { type: 'visits', price: 6000 },
        ],
        bio: 'Estudiante de veterinaria. Me encantan los perros activos y salir a correr con ellos.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    },
    {
        id: '3',
        name: 'Elena & Pablo',
        rating: 4.8,
        reviews: 89,
        location: 'Santa Ana, San José',
        services: [
            { type: 'boarding', price: 18000 },
            { type: 'daycare', price: 12000 },
            { type: 'walking', price: 6000 },
        ],
        bio: 'Pareja joven con experiencia en perros senior y cachorros. Tu mascota será parte de nuestra familia.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        badge: 'Verificado',
    },
    {
        id: '4',
        name: 'Sofia M.',
        rating: 4.7,
        reviews: 21,
        location: 'Heredia Centro',
        services: [
            { type: 'visits', price: 7000 },
            { type: 'walking', price: 4500 },
        ],
        bio: 'Especialista en gatos. Sé cómo ganarme su confianza y darles el espacio que necesitan.',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    },
    {
        id: '5',
        name: 'Dr. Jorge L.',
        rating: 5.0,
        reviews: 210,
        location: 'Rohrmoser, San José',
        services: [
            { type: 'boarding', price: 25000 },
        ],
        bio: 'Veterinario retirado. Ofrezco cuidados especiales para mascotas con necesidades médicas.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        badge: 'Veterinario',
    },
    {
        id: '6',
        name: 'Lucía P.',
        rating: 4.6,
        reviews: 15,
        location: 'Alajuela Centro',
        services: [
            { type: 'boarding', price: 12000 },
            { type: 'visits', price: 5000 },
        ],
        bio: 'Tengo mucho tiempo libre y amor para dar. Tu mascota no pasará ni un minuto sola.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    },
];
