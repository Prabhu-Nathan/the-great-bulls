import { Document, Schema } from "mongoose";

export const ContactRequestSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, require: true },
    mobileNo: { type: Number, require: true },
    message: { type: String, require: true }
})

export interface ContactRequest extends Document {
    name: string;
    email: string;
    mobileNo: string;
    message: string
}
