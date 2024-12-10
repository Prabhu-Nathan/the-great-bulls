import { Body, Controller, Get, Post } from "@nestjs/common";
import { TermsConditionService } from "./terms-condition.service";
import { Public } from "../auth/public.decorator";

@Controller('terms-conditions')
export class TermsConditionController {
    constructor(private readonly termsConditionService: TermsConditionService) { }

    //create terms and Condition
    @Public()
    @Post()
    async createTermsCondition(@Body() body: { content: string }) {
        const result = await this.termsConditionService.createTermsCondition(body.content);
        return {
            status: 200,
            message: 'Terms and Conditions updated successfully',
            data: result,
        };
    }

    //Get Terms and Condition
    @Public()
    @Get()
    async getTermsCondition() {
        const result = await this.termsConditionService.getTermsConditions();
        return {
            status: 200,
            message: 'Terms and Conditions fetched successfully',
            data: result,
        };
    }
}