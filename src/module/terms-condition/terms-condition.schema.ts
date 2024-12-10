import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TermsCondition extends Document {
    @Prop({ required: true })
    content: string;
}

export const TermsConditionSchema = SchemaFactory.createForClass(TermsCondition);
