import { NextFunction, Request, Response } from 'express';
import { IExceptionFilter } from './exception.filter.interface';
import { HttpError } from './http.error';
import { injectable, inject } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		this.loggerService = loggerService;
	}

	catch(err: HttpError | Error, req: Request, res: Response, next: NextFunction) {
		if (err instanceof HttpError) {
			this.loggerService.error(
				`[${err.context}] Http-Error [${err.statusCode}]- [${err.message}]`,
			);
			res.status(err.statusCode).send({ status: 'fail', err: err.message });
		} else {
			this.loggerService.error(err.message);
			res.status(500).send({ status: 'fail', err: err.message });
		}
	}
}
