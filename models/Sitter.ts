import mongoose, { Schema, Model, models } from 'mongoose';

interface IService {
    type: 'boarding' | 'walking' | 'daycare' | 'visits' | 'taxi' | 'grooming' | 'training';
    price: number;
}

export interface ISitter {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    bio: string; // Long bio
    aboutSummary?: string; // Short "About me" summary
    age?: number;
    experienceYears?: number;
    ownPets?: string;
    skills?: string[];
    location: string;
    locationMap?: {
        lat: number;
        lng: number;
    };
    services: IService[];
    acceptedPetTypes?: string[];
    acceptedPetSizes?: string[];
    supervisionLevel?: string;
    pottyBreaks?: string;
    walksPerDay?: string;
    emergencyTransport?: boolean;
    lastMinuteBookings?: boolean;
    image: string;
    rating: number;
    reviewCount: number;
    completedBookings: number;
    repeatCustomers: number;
    payments: string[];
    verifications?: string[];
    badge?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ServiceSchema = new Schema<IService>({
    type: {
        type: String,
        enum: ['boarding', 'walking', 'daycare', 'visits', 'taxi', 'grooming', 'training'],
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive'],
    },
});

const SitterSchema = new Schema<ISitter>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        bio: {
            type: String,
            required: [true, 'Bio is required'],
            maxlength: [1000, 'Bio cannot exceed 1000 characters'],
        },
        aboutSummary: {
            type: String,
            maxlength: [200, 'Summary cannot exceed 200 characters'],
        },
        age: Number,
        experienceYears: Number,
        ownPets: String,
        skills: [String],
        location: {
            type: String,
            required: [true, 'Location is required'],
        },
        locationMap: {
            lat: Number,
            lng: Number,
        },
        services: {
            type: [ServiceSchema],
            required: true,
            validate: {
                validator: function (v: IService[]) {
                    return v && v.length > 0;
                },
                message: 'At least one service is required',
            },
        },
        acceptedPetTypes: [String],
        acceptedPetSizes: [String],
        supervisionLevel: String,
        pottyBreaks: String,
        walksPerDay: String,
        emergencyTransport: {
            type: Boolean,
            default: false,
        },
        lastMinuteBookings: {
            type: Boolean,
            default: false,
        },
        image: {
            type: String,
            default: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        reviewCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        completedBookings: {
            type: Number,
            default: 0,
            min: 0,
        },
        repeatCustomers: {
            type: Number,
            default: 0,
            min: 0,
        },
        payments: {
            type: [String],
            default: ['cash'],
        },
        verifications: {
            type: [String],
            default: ['email'],
        },
        badge: {
            type: String,
            enum: ['Premium', 'Verificado', 'Veterinario', ''],
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

const Sitter: Model<ISitter> = models.Sitter || mongoose.model<ISitter>('Sitter', SitterSchema);

export default Sitter;
