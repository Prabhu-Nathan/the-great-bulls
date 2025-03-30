import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CourseSchema } from "./course.schema";
import { CourseController } from "./course.controller";
import { CourseService } from "./course.service";

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost/thegreatbulls_course'),
    MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]),
    ],
    controllers: [CourseController],
    providers: [CourseService]
})
export class CourseModule {}
