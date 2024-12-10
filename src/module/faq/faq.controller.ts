import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { FAQService } from './faq.service';
import { Public } from '../auth/public.decorator';

@Controller('faq')
export class FAQController {
  constructor(private readonly faqService: FAQService) { }

  @Public()
  @Post()
  async createFAQ(@Body() body: { question: string; answer: string }) {
    const result = await this.faqService.createFAQ(body.question, body.answer);
    return {
      status: 200,
      message: 'FAQ created successfully',
      data: result
    }
  }

  @Public()
  @Get()
  async getFAQs() {
    const result = await this.faqService.getFAQs();
    return {
      status: 200,
      message: 'FAQ fetched successfully',
      data: result
    }
  }

  @Public()
  @Put(':id')
  async updateFAQ(
    @Param('id') id: string,
    @Body() body: { question: string; answer: string }
  ) {
    const result = await this.faqService.updateFAQ(id, body.question, body.answer);
    return {
      status: 200,
      message: 'FAQ updated successfully',
      data: result
    }
  }

  @Public()
  @Delete(':id')
  async deleteFAQ(@Param('id') id: string) {
    const result = await this.faqService.deleteFAQ(id);
    return {
      status: 200,
      message: 'FAQ deleted succesfully',
      data: result
    }
  }
}
