"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = exports.UserResponseDto = void 0;
class UserResponseDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.UserResponseDto = UserResponseDto;
class UserDto extends UserResponseDto {
    constructor(partial) {
        super(partial);
    }
}
exports.UserDto = UserDto;
