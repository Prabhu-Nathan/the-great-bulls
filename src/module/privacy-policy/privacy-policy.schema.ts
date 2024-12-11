import { Document, Schema } from "mongoose";

export const PrivacyPolicySchema = new Schema({
    content: { type: String, required: true }
}, { timestamps: true })

export interface PrivacyPolicy extends Document {
    content: string
}
