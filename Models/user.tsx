
import mongoose, { Schema, Document } from 'mongoose';

interface UserDocument extends Document {
    userName: string;
    email: string;
    password: string;
    displayName?: string;
    displayPicture?: string;
    bio?: string;
    followers?: number;
    following?: number;
    createdDate?: Date;
}

const userSchema: Schema<UserDocument> = new Schema<UserDocument>({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: false
    },
    displayPicture: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    followers: {
        type: Number,
        required: false
    },
    following: {
        type: Number,
        required: false
    },
    createdDate: {
        type: Date,
        required: false
    }
});

const User = mongoose.model<UserDocument>('users', userSchema);
export default User;
