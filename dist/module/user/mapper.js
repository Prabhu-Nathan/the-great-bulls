"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mapper = void 0;
class Mapper {
    static toUserResponse(user) {
        return {
            id: user._id,
            name: user.username,
            email: user.email,
        };
    }
    static toUser(createUserDto) {
        return createUserDto;
    }
}
exports.Mapper = Mapper;
//# sourceMappingURL=mapper.js.map