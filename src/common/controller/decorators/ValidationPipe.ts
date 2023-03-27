import { ClassConstructor } from 'class-transformer/types/interfaces';
import 'reflect-metadata';
import { IMiddleware } from '../../middleware.interface';
import { ValidationPipeMiddleWare } from '../../validation-pipe.middleware';

export interface IValidationPipeMetaData {
	type: 'validation-pipe';
	middleware: IMiddleware;
	method: string;
}
export function ValidationPipe(dto: ClassConstructor<Object>) {
	return (target: any, propertyKey: string, _descriptor: PropertyDescriptor) => {
		const key = `${propertyKey}:middleware`;
		Reflect.defineMetadata(
			key,
			{
				type: 'validation-pipe',
				middleware: new ValidationPipeMiddleWare(dto),
				method: propertyKey,
			} as IValidationPipeMetaData,
			target,
		);
	};
}
