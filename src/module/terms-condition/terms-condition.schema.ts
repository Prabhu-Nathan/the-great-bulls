import { Document, Schema } from 'mongoose';

export const TermsConditionSchema = new Schema({
    content: { type: String, required: true },
    version: { type: Number, required: true },
    active: { type: Boolean, default: true }
}, { timestamps: true })

export interface TermsCondition extends Document {
    content: string;
    version: number;
    active: boolean;
}
