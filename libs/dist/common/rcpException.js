"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomRpcException = void 0;
class CustomRpcException extends Error {
    constructor(statusCode, message, errorCode, details) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errorCode = errorCode;
        this.details = details;
        this.name = "CustomRpcException";
    }
    toJSON() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            errorCode: this.errorCode,
            details: this.details,
            timestamp: new Date().toISOString(),
        };
    }
}
exports.CustomRpcException = CustomRpcException;
