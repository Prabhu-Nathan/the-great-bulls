import { Body, Controller, Get, Post } from "@nestjs/common";
import { RefundPolicyService } from "./refund-policy.service";
import { Public } from "../auth/public.decorator";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../user/enum";

@Controller('refund-policy')
export class RefundPolicyController {
    constructor(private readonly refundPolicyService: RefundPolicyService) { }

    @Roles(Role.ADMIN)
    @Post()
    async createRefundPolicy(@Body() body: { content: string }) {
        const result = await this.refundPolicyService.createRefundPolicy(body.content)
        return {
            status: 200,
            message: 'Refund Policy updated successfully',
            data: result
        }
    }

    @Public()
    @Get()
    async getRefundPolicy() {
        const result = await this.refundPolicyService.getRefundPolicy();
        return {
            status: 200,
            message: 'Refund Policy fetched successfully',
            data: result
        }
    }
}
