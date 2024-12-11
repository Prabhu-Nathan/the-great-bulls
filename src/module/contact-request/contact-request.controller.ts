import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ContactRequestService } from "./contact-request.service";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../user/enum";

@Controller('contact-request')
export class ContactRequestController {
    constructor(private readonly contactRequestService: ContactRequestService) { }

    @Roles(Role.STUDENT)
    @Post()
    async createContactRequest(@Body() body: { name: string; email: string; mobileNo: number; message: string }) {
        return await this.contactRequestService.createContactRequest(body.name, body.email, body.mobileNo, body.message)
    }

    @Roles(Role.ADMIN)
    @Get()
    async getContactRequest() {
        return await this.contactRequestService.getContactRequest();
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    async deleteContactRequest(@Param('id') id: string) {
        return await this.contactRequestService.deleteContactRequest(id); 
    }
}
