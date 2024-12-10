import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RefundPolicy } from "./refund-policy.schema";

@Injectable()
export class RefundPolicyService {
    constructor(
        @InjectModel('RefundPolicy') private readonly refundPolicyModel: Model<RefundPolicy>
    ) { }

    //create new refund policy
    async createRefundPolicy(content: string): Promise<RefundPolicy> {
        const existingEntry = await this.refundPolicyModel.findOne();
        if (existingEntry) {
            existingEntry.content = content
            return existingEntry.save()
        } else {
            const newEntry = new this.refundPolicyModel({ content })
            return newEntry.save()
        }
    }

    //get refund policy
    async getRefundPolicy(): Promise<RefundPolicy[]> {
        return this.refundPolicyModel.find().exec()
    }
}