import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class PrivacyPolicy extends Document {
    @Prop({ required: true })
    content: string
}
export const PrivacyPolicySchema = SchemaFactory.createForClass(PrivacyPolicy)