import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CourseService } from "./course.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { extname } from "path";
import { diskStorage } from 'multer';
import { Public } from "../auth/public.decorator";

@Controller('courses')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    @Public()
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('video', {
            storage: diskStorage({
                destination: './uploads/videos',
                filename: (req, file, callback) => {
                    const uniqueName = `${Date.now()}${extname(file.originalname)}`;
                    callback(null, uniqueName);
                },
            }),
        }),
    )
    async uploadCourse(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: { courseName: string; description: string; duration: string },
    ) {
        const courseData = {
            courseName: body.courseName,
            description: body.description,
            duration: body.duration,
            video: file.filename,
        };
        return this.courseService.createCourse(courseData);
    }

    @Public()
    @Get()
    async getCourses() {
        return await this.courseService.getCourse();
    }
}
