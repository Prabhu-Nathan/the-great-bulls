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
                destination: './uploads/videos', // Save files in this folder
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
            video: file.filename, // Save the file name or full path
        };
        // return this.courseService.createCourse(courseData);
        const result = await this.courseService.createCourse(courseData);
        return {
            status: 200,
            message: 'Course Service created succesfully',
            data: result
        }
    }

    @Public()
    @Get()
    async getCourses() {
        const result = await this.courseService.getCourse();
        return {
            status: 200,
            message: 'Course Service fetched succesfully',
            data: result
        }
    }
}
