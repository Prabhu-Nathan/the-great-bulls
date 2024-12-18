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

        const latest = await this.termsConditionModel.findOne({ active: true }).sort({ version: -1 })

        if (latest) {
            latest.active = false;
            await latest.save();
        }

        const newEntry = new this.termsConditionModel({ content, version: latest ? latest.version + 1 : 1, active: true });
        return newEntry.save()


    }

    async getTermsConditions(): Promise<TermsCondition[]> {
        return this.termsConditionModel.find({ active: true }).exec()
    }
}
