import { Schema } from "mongoose";

export const UserTermsConditionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    termsCondition: { type: Schema.Types.ObjectId, ref: 'TermsCondition', required: true },
    accpectedAt: { type: Date, default: Date.now },
    userAgent: { type: String, required: true }

}, { timestamps: true })

export interface UserTermsCondition extends Document {
    user: string;
    termsCondition: string;
    accpectedAt: Date;
    userAgent: string;
}
