import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FAQSchema } from './faq.schema';
import { FAQService } from './faq.service';
import { FAQController } from './faq.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'FAQ', schema: FAQSchema }])],
  providers: [FAQService],
  controllers: [FAQController],
})
export class FAQModule {}
