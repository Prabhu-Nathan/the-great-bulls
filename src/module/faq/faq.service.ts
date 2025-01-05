import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FAQ } from './faq.schema';

@Injectable()
export class FAQService {
  constructor(@InjectModel('FAQ') private faqModel: Model<FAQ>) {}

  async createFAQ(question: string, answer: string): Promise<FAQ> {
    const faq = new this.faqModel({ question, answer });
    return faq.save();
  }

  async getFAQs(): Promise<FAQ[]> {
    return this.faqModel.find();
  }

  async updateFAQ(id: string, question: string, answer: string): Promise<FAQ> {
    const faq = await this.faqModel.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true }
    );

    if (!faq) {
      throw new NotFoundException('FAQ not found');
    }

    return faq;
  }

  async deleteFAQ(id: string): Promise<void> {
    const result = await this.faqModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException('FAQ not found');
    }
  }
}
