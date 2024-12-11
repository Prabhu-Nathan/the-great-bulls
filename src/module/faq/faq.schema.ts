import { Schema, Document } from 'mongoose';

export const FAQSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
}, { timestamps: true })

export interface FAQ extends Document {
  question: string,
  answer: string
}
