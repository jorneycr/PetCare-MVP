export interface Sitter {
    id: string;
    name: string;
    location: string;
    rating: number;
    reviews: number;
    price: number;
    currency: string;
    services: string[];
    imageUrl: string; // Placeholder por ahora
    about: string;
    verified: boolean;
}

export const MOCK_SITTERS: Sitter[] = [
    {
        id: '1',
        name: 'Ana María G.',
        location: 'San José, Escazú',
        rating: 4.9,
        reviews: 124,
        price: 15000,
        currency: 'CRC',
        services: ['Alojamiento', 'Paseo'],
        imageUrl: 'https://placehold.co/400x400/png?text=Ana',
        about: 'Amante de los perros con jardín grande. Tu mascota será parte de la familia.',
        verified: true,
    },
    {
        id: '2',
        name: 'Carlos R.',
        location: 'Heredia, Centro',
        rating: 4.8,
        reviews: 45,
        price: 12000,
        currency: 'CRC',
        services: ['Paseo', 'Visitas'],
        imageUrl: 'https://placehold.co/400x400/png?text=Carlos',
        about: 'Estudiante veterinario con experiencia en perros grandes y reactivos.',
        verified: true,
    },
    {
        id: '3',
        name: 'Sofía L.',
        location: 'Alajuela, La Guácima',
        rating: 5.0,
        reviews: 12,
        price: 18000,
        currency: 'CRC',
        services: ['Alojamiento', 'Guardería'],
        imageUrl: 'https://placehold.co/400x400/png?text=Sofia',
        about: 'Casa de campo ideal para vacaciones caninas. Atención 24/7.',
        verified: false,
    },
    {
        id: '4',
        name: 'Pet Paradise CR',
        location: 'San Pedro, Montes de Oca',
        rating: 4.7,
        reviews: 230,
        price: 10000,
        currency: 'CRC',
        services: ['Guardería', 'Peluquería'],
        imageUrl: 'https://placehold.co/400x400/png?text=PetParadise',
        about: 'Centro profesional de cuidado diurno. Diversión garantizada.',
        verified: true,
    },
    {
        id: '5',
        name: 'Eduardo M.',
        location: 'Cartago, Tres Ríos',
        rating: 4.9,
        reviews: 89,
        price: 14000,
        currency: 'CRC',
        services: ['Alojamiento', 'Transporte'],
        imageUrl: 'https://placehold.co/400x400/png?text=Eduardo',
        about: 'Experiencia con gatos y perros ancianos. Administración de medicamentos.',
        verified: true,
    },
];
