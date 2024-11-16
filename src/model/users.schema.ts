import { Schema, Document } from 'mongoose';
import { Role } from 'src/module/user/enum';

export const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: [Role.STUDENT, Role.ADMIN],
    default: Role.STUDENT,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  profilePicture: { type: String, default: '' },
  isVerified: { type: Boolean, required: true, default: false },
  verificationToken: { type: String },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  profilePicture: string;
  isVerified: boolean;
  verificationToken: string;
}
