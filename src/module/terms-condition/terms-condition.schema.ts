import { Document, Schema } from 'mongoose';

export const TermsConditionSchema = new Schema({
    content: { type: String, required: true }
}, { timestamps: true })

export interface TermsCondition extends Document {
    content: string
}
