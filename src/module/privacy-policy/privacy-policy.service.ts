import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PrivacyPolicy } from "./privacy-policy.schema";

@Injectable()
export class PrivacyPolicyService {
    constructor(
        @InjectModel('PrivacyPolicy') private readonly privacyPolicyModel: Model<PrivacyPolicy>
    ) { }

    async createPrivacyPolicy(content: string): Promise<PrivacyPolicy> {
        const existingEntry = await this.privacyPolicyModel.findOne()
        if (existingEntry) {
            existingEntry.content = content
            return existingEntry.save()
        } else {
            const newEntry = new this.privacyPolicyModel({ content })
            return newEntry.save()
        }
    }

    async getPrivacyPolicy(): Promise<PrivacyPolicy[]> {
        return this.privacyPolicyModel.find().exec()
    }
}
