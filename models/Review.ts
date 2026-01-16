import mongoose, { Schema, Model, models } from 'mongoose';

export interface IReview {
    _id: mongoose.Types.ObjectId;
    sitterId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
    {
        sitterId: {
            type: Schema.Types.ObjectId,
            ref: 'Sitter',
            required: [true, 'Sitter ID is required'],
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
        },
        rating: {
            type: Number,
            required: [true, 'Rating is required'],
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: [true, 'Comment is required'],
            maxlength: [500, 'Comment cannot exceed 500 characters'],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Review: Model<IReview> = models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
