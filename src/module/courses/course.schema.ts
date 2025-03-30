import { Document, Schema } from "mongoose";

export const CourseSchema = new Schema({
    courseName: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    video: { type: String, required: true }
}, { timestamps: true })

export interface Course extends Document {
    courseName: string;
    description: string;
    duration: string;
    video: string;
}
