import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserTermsCondition } from "./user-terms-condition.schema";
import { Model } from "mongoose";
import { TermsCondition } from "../terms-condition/terms-condition.schema";

@Injectable()
export class UserTermsConditionService {
    constructor(
        @InjectModel('UserTermsCondition') private readonly userTermsConditionModal: Model<UserTermsCondition>,
        @InjectModel('TermsCondition') private readonly termsConditionModel: Model<TermsCondition>
    ) { }

    async acceptTerms(userId: string, userAgent: string): Promise<UserTermsCondition> {
        const activeTerms = await this.termsConditionModel.findOne({ active: true });
        if (!activeTerms) throw new Error('No active terms found');

        const newUserTerms = new this.userTermsConditionModal({
            user: userId,
            termsCondition: activeTerms._id,
            userAgent
        })

        return newUserTerms.save();
    }

    async hasUserAcceptedLatest(userId: string): Promise<boolean> {
        const activeTerms = await this.termsConditionModel.findOne({ active: true });
        if (!activeTerms) return false;

        const userAcceptance = await this.userTermsConditionModal.findOne({
            user: userId,
            termsCondition: activeTerms._id,
        });

        return !userAcceptance

    }
}
