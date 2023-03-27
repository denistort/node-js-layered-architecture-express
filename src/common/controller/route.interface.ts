import { NextFunction, Request, Response, Router } from 'express';
import { IMiddleware } from '../middleware.interface';

type handlerWithoutNextFunction = (req: Request, res: Response) => void;
type handlerWithNextFunction = (req: Request, res: Response, next: NextFunction) => void;

export interface BaseControllerRoute {
	path: string;
	method: keyof Pick<Router, 'get' | 'post' | 'patch' | 'delete' | 'put'>;
	handler: (handlerWithNextFunction) | (handlerWithoutNextFunction);
	middlewares?: IMiddleware[]
}
