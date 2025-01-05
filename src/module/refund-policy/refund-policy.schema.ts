import { Document, Schema } from "mongoose";

export const RefundPolicySchema = new Schema({
    content: { type: String, required: true }
}, { timestamps: true })

export interface RefundPolicy extends Document {
    content: String
}
