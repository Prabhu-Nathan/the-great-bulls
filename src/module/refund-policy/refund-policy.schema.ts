import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class RefundPolicy extends Document {
    @Prop({ required: true })
    content: string
}
export const RefundPolicySchema = SchemaFactory.createForClass(RefundPolicy)