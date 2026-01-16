import mongoose, { Schema, Model, models } from 'mongoose';

export interface IUser {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    userType: 'owner' | 'sitter' | 'both';
    country?: string;
    province?: string;
    canton?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [50, 'Name cannot exceed 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
            select: false, // Don't return password by default
        },
        userType: {
            type: String,
            enum: ['owner', 'sitter', 'both'],
            default: 'owner',
        },
        country: {
            type: String,
            default: 'Costa Rica',
        },
        province: {
            type: String,
        },
        canton: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent model recompilation in development
const User: Model<IUser> = models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
