import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ContactRequestService } from "./contact-request.service";
import { Public } from "../auth/public.decorator";

@Controller('contact-request')
export class ContactRequestController {
    constructor(private readonly contactRequestService: ContactRequestService) { }

    @Public()
    @Post()
    async createContactRequest(@Body() body: { name: string; email: string; mobileNo: number; message: string }) {
        const result = await this.contactRequestService.createContactRequest(body.name, body.email, body.mobileNo, body.message)
        return {
            status: 200,
            message: 'Contact Request created successfully',
            data: result
        }
    }

    @Public()
    @Get()
    async getContactRequest() {
        const result = await this.contactRequestService.getContactRequest();
        return {
            status: 200,
            message: 'Contact Request fetched successfully',
            data: result
        }
    }

    @Public()
    @Delete(':id')
    async deleteContactRequest(@Param('id') id: string) {
        const result = await this.contactRequestService.deleteContactRequest(id);
        return {
            status: 200,
            message: 'Contact Request deleted successfully',
            data: result
        }
    }
}