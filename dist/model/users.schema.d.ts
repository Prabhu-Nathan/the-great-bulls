import { Schema, Document } from 'mongoose';
import { Role } from 'src/module/user/enum';
export declare const UserSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    username: string;
    email: string;
    password: string;
    role: Role;
    profilePicture: string;
    isVerified: boolean;
    verificationToken?: string;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    username: string;
    email: string;
    password: string;
    role: Role;
    profilePicture: string;
    isVerified: boolean;
    verificationToken?: string;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    username: string;
    email: string;
    password: string;
    role: Role;
    profilePicture: string;
    isVerified: boolean;
    verificationToken?: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    profilePicture: string;
    isVerified: boolean;
    verificationToken: string;
}
