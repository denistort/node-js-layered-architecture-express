import { Handler, Response, Router } from 'express';

import { BaseControllerRoute } from './route.interface';
import { ILogger } from '../../logger/logger.interface';

import 'reflect-metadata';

export default abstract class BaseController {
	// private readonly _router: Router;
	private static _router: Router = Router();
	constructor(protected loggerService: ILogger) {
		// this._router = Router();
		this.loggerService = loggerService;
		console.log('Отработал конструктор');
		console.log(Reflect.getMetadata('controllerMetaData', this));
	}

	public get router(): Router {
		return BaseController._router;
	}

	public send<T>(res: Response, code: number, message: T) {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T) {
		return this.send<T>(res, 200, message);
	}
	public created(res: Response): void {
		res.status(201);
	}
	protected bindRoutes(routes: BaseControllerRoute[]): void {
		for (const route of routes) {
			this.loggerService.log(`[${route.method}] binded to => ${route.path}`);
			BaseController._router[route.method](route.path, route.handler.bind(this));
		}
	}
	public bindSingleRoute(
		method: keyof Pick<Router, 'get' | 'post' | 'patch' | 'delete' | 'put'>,
		path: string,
		handler: Handler,
	): void {
		BaseController._router[method](path, handler.bind(this));
	}
}
