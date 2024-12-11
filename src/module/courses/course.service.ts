import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Course } from "./course.schema";

@Injectable()
export class CourseService {
    constructor(@InjectModel('Course') private readonly courseModel: Model<Course>) { }

    async createCourse(data: Partial<Course>): Promise<Course> {
        const newCourse = new this.courseModel(data)
        return newCourse.save()
    }

    async getCourse(): Promise<Course[]> {
        return this.courseModel.find().exec()
    }
}
