import { NextFunction, Request, Response } from 'express';
import { HttpError } from './http.error';

export interface IExceptionFilter {
	catch: (err: HttpError | Error, req: Request, res: Response, next: NextFunction) => void;
}
