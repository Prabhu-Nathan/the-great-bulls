import { Body, Controller, Get, Post } from "@nestjs/common";
import { PrivacyPolicyService } from "./privacy-policy.service";
import { Public } from "../auth/public.decorator";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../user/enum";

@Controller('privacy-policy')
export class PrivacyPolicyController {
    constructor(private readonly privacyPolicyService: PrivacyPolicyService) { }

    @Roles(Role.ADMIN)
    @Post()
    async createPrivacyPolicy(@Body() body: { content: string }) {
        return await this.privacyPolicyService.createPrivacyPolicy(body.content)
    }

    @Public()
    @Get()
    async getPrivacyPolicy() {
        return await this.privacyPolicyService.getPrivacyPolicy()
    }
}
