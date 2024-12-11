import { Document, Schema } from 'mongoose';

export const TermsConditionSchema = new Schema({
    content: { type: String, required: true }
})
export interface TermsCondition extends Document {
    content: string
}
