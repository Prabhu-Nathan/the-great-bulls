import { UserService } from "src/module/user/user.service";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    constructor(usersService: UserService);
    validate(payload: any): Promise<import("../user/users.schema").User>;
}
export {};
