import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserTermsConditionSchema } from "./user-terms-condition.schema";
import { UserTermsConditionController } from "./user-terms-condition.controller";
import { TermsConditionSchema } from "../terms-condition/terms-condition.schema";
import { UserTermsConditionService } from "./user-terms-condition.services";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'UserTermsCondition', schema: UserTermsConditionSchema }]),
        MongooseModule.forFeature([{ name: 'TermsCondition', schema: TermsConditionSchema }])
    ],
    controllers: [UserTermsConditionController],
    providers: [UserTermsConditionService]
})
export class UserTermsConditionModule {}
