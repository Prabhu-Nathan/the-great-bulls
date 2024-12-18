import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserTermsConditionService } from "./user-terms-condition.services";

@Controller('user-terms-condition')
export class UserTermsConditionController {
    constructor(private readonly userTermsConditionService: UserTermsConditionService) { }

    @Post('/accept')
    async acceptTermsCondition(
        @Body('userId') userId: string,
        @Body('userAgent') userAgent: string
    ) {
        return await this.userTermsConditionService.acceptTerms(userId, userAgent);
    }

    @Get('/status/:userId')
    async checkUserAcceptance(@Param('userId') userId: string) {
        const hasAccepted = await this.userTermsConditionService.hasUserAcceptedLatest(userId);
        return { hasAccepted };
    }
}