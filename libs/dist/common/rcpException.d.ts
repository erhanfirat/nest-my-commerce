export declare class CustomRpcException extends Error {
    readonly statusCode: number;
    readonly message: string;
    readonly errorCode?: string | undefined;
    readonly details?: any | undefined;
    constructor(statusCode: number, message: string, errorCode?: string | undefined, details?: any | undefined);
    toJSON(): {
        statusCode: number;
        message: string;
        errorCode: string | undefined;
        details: any;
        timestamp: string;
    };
}
