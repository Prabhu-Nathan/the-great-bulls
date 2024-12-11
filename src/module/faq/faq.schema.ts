import { Schema, Document } from 'mongoose';

export const FAQSchema = new Schema({
  question: String,
  answer: String
})

export interface FAQ extends Document {
  question: string,
  answer: string
}
