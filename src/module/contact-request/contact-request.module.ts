import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ContactRequestSchema } from "./contact-request.schema";
import { ContactRequestService } from "./contact-request.service";
import { ContactRequestController } from "./contact-request.controller";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'ContactRequest', schema: ContactRequestSchema }])],
    providers: [ContactRequestService],
    controllers: [ContactRequestController]
})
export class ContactRequestModule {}
