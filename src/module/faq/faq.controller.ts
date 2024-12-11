import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { FAQService } from './faq.service';
import { Public } from '../auth/public.decorator';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../user/enum';

@Controller('faq')
export class FAQController {
  constructor(private readonly faqService: FAQService) { }

  @Roles(Role.ADMIN)
  @Post()
  async createFAQ(@Body() body: { question: string; answer: string }) {
    return await this.faqService.createFAQ(body.question, body.answer);
  }

  @Public()
  @Get()
  async getFAQs() {
    return await this.faqService.getFAQs();
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  async updateFAQ(
    @Param('id') id: string,
    @Body() body: { question: string; answer: string }
  ) {
    return await this.faqService.updateFAQ(id, body.question, body.answer);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteFAQ(@Param('id') id: string) {
    return await this.faqService.deleteFAQ(id);
  }
}
