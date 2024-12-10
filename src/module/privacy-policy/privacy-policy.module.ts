import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PrivacyPolicySchema } from "./privacy-policy.schema";
import { PrivacyPolicyController } from "./privacy-policy.controller";
import { PrivacyPolicyService } from "./privacy-policy.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'PrivacyPolicy', schema: PrivacyPolicySchema }])
    ],
    controllers: [PrivacyPolicyController],
    providers: [PrivacyPolicyService]
})
export class PrivacyPolicyModule { }