"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_PATTERNS = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["SUPER_ADMIN"] = "SUPER_ADMIN";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["SELLER"] = "SELLER";
    UserRole["USER"] = "USER";
    UserRole["GUEST"] = "GUEST";
})(UserRole || (exports.UserRole = UserRole = {}));
exports.USER_PATTERNS = {
    FIND_ALL: "Users.FindAll",
    FIND_ONE: "Users.FindOne",
    FIND_BY_EMAIL: "Users.FindByEmail",
    CREATE: "Users.Create",
    UPDATE: "Users.Update",
    REMOVE: "Users.Remove",
};
