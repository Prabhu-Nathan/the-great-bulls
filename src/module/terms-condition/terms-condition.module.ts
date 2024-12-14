import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TermsConditionSchema, } from "./terms-condition.schema";
import { TermsConditionController, } from "./terms-condition.controller";
import { TermsConditionService, } from "./terms-condition.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'TermsCondition', schema: TermsConditionSchema }])
    ],
    controllers: [TermsConditionController],
    providers: [TermsConditionService]
})
export class TermsConditionModule {}
