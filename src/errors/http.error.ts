export class HttpError extends Error {
    statusCode: number;
    context: string | undefined;
    
    constructor(statusCode: number, message: string, context?: string) {
        super(message)
        this.statusCode = statusCode;
        this.context = context;
    }
}