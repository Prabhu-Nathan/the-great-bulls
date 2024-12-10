import { Schema, Document } from 'mongoose';

export interface FAQ extends Document {
  question: string;
  answer: string;
}

export const FAQSchema = new Schema<FAQ>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
}, { timestamps: true });
