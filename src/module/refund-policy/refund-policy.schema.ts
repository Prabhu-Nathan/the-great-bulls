import { Document, Schema } from "mongoose";

export const RefundPolicySchema = new Schema({
    content: { type: String, require: true }
}, { timestamps: true })

export interface RefundPolicy extends Document {
    content: String
}
