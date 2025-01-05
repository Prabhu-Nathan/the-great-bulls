import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RefundPolicySchema } from "./refund-policy.schema";
import { RefundPolicyService } from "./refund-policy.service";
import { RefundPolicyController } from "./refund-policy.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'RefundPolicy', schema: RefundPolicySchema }])
    ],
    controllers: [RefundPolicyController],
    providers: [RefundPolicyService]
})
export class RefundPolicyModule {}
