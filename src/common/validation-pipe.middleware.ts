import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './middleware.interface';

export class ValidationPipeMiddleWare implements IMiddleware {
	constructor(private dto: ClassConstructor<Object>) {}
	async execute({ body }: Request, res: Response, next: NextFunction) {
        const instance = plainToInstance(this.dto, body);
        const errors = await validate(instance);
        if (errors.length > 0) {
            const errs = errors.map(err => ({ field: err.property, errors: err.constraints }))
            const result = {
                status: 'fail',
                errors: errs,
            }
            res.status(422).send(result);
        } else {
            next();
        }
	}
}
