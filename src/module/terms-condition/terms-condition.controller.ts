import { Body, Controller, Get, Post } from "@nestjs/common";
import { TermsConditionService } from "./terms-condition.service";
import { Public } from "../auth/public.decorator";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../user/enum";

@Controller('terms-conditions')
export class TermsConditionController {
    constructor(private readonly termsConditionService: TermsConditionService) { }

    @Roles(Role.ADMIN)
    @Post()
    async createTermsCondition(@Body() body: { content: string }) {
        return await this.termsConditionService.createTermsCondition(body.content);
    }

    @Public()
    @Get()
    async getTermsCondition() {
        return await this.termsConditionService.getTermsConditions();
    }
}
