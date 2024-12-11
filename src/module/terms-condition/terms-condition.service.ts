import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TermsCondition } from "./terms-condition.schema";


@Injectable()
export class TermsConditionService {
    constructor(
        @InjectModel('TermsCondition') private readonly termsConditionModel: Model<TermsCondition>
    ) { }

    async createTermsCondition(content: string): Promise<TermsCondition> {
        const existingEntry = await this.termsConditionModel.findOne();
        if (existingEntry) {
            existingEntry.content = content;
            return existingEntry.save()
        } else {
            const newEntry = new this.termsConditionModel({ content });
            return newEntry.save()
        }

    }

    async getTermsConditions(): Promise<TermsCondition[]> {
        return this.termsConditionModel.find().exec()
    }
}
