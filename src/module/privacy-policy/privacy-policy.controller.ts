import { Body, Controller, Get, Post } from "@nestjs/common";
import { PrivacyPolicyService } from "./privacy-policy.service";
import { Public } from "../auth/public.decorator";

@Controller('privacy-policy')
export class PrivacyPolicyController {
    constructor(private readonly privacyPolicyService: PrivacyPolicyService) { }

    //create privacy policy
    @Public()
    @Post()
    async createPrivacyPolicy(@Body() body: { content: string }) {
        const result = await this.privacyPolicyService.createPrivacyPolicy(body.content)
        return {
            status: 200,
            message: 'Privacy Policy updated succesfully',
            data: result
        }
    }

    //get privacy policy
    @Public()
    @Get()
    async getPrivacyPolicy() {
        const result = await this.privacyPolicyService.getPrivacyPolicy()
        return {
            status: 200,
            message: 'Privacy Policy fetched successfully',
            data: result

        }
    }
}