import { Document, Schema } from "mongoose";

export interface ContactRequest extends Document {
    name: string;
    email: string;
    mobileNo: number;
    message: string

}

export const ContactRequestSchema = new Schema<ContactRequest>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileNo: { type: Number, required: true },
    message: { type: String, required: true }
}, { timestamps: true })