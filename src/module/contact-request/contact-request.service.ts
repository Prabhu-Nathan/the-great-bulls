import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ContactRequest } from "./contact-request.schema";

@Injectable()
export class ContactRequestService {
    constructor(
        @InjectModel('ContactRequest') private contactRequestModel: Model<ContactRequest>) { }

    async createContactRequest(name: string, email: string, mobileNo: number, message: string): Promise<ContactRequest> {
        const contactRequest = new this.contactRequestModel({ name, email, mobileNo, message })
        return contactRequest.save()
    }

    async getContactRequest(): Promise<ContactRequest[]> {
        return this.contactRequestModel.find()
    }

    async deleteContactRequest(id: string): Promise<void> {
        const result = await this.contactRequestModel.findByIdAndDelete(id);

        if (!result) {
            throw new NotFoundException('Contact Request not found')
        }
    }
}
