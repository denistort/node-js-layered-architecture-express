import 'reflect-metadata';
import { Express, Router } from 'express';
import express from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';

import { ILogger } from './logger/logger.interface';
import { IControllerMetaData } from './common/controller/decorators/Controller';
import { BaseControllerRoute } from './common/controller/route.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { TYPES } from './types';
import { IUsersController } from './users/user.controller.interface';
import bodyParser from 'body-parser';
import { IMiddleware } from './common/middleware.interface';

@injectable()
export default class App {
	protected app: Express;
	private server: Server | undefined;
	private isInited: boolean = false;
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IUsersController) private usersController: IUsersController,
		@inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
	) {
		this.app = express();
	}
	private useMiddlewares(): void {
		this.app.use(bodyParser.json());
	}
	private useRoutes() {
		this.useController(this.usersController);
	}
	private useController<T extends Object>(controller: T): void {
		const keys = Reflect.getMetadataKeys(controller);
		if (keys.length === 0 || !keys.includes('controllerMetaData')) {
			throw new Error('Controller is not register');
		}
		const router = Router();
		const meta = Reflect.getMetadata(keys.at(-1), controller) as IControllerMetaData;
		const handlers = keys
			.filter((key) => key.includes(':handler'))
			.map((key) => Reflect.getMetadata(key, controller)) as BaseControllerRoute[];
		const middlewares = keys
			.filter((key) => key.includes(':middleware'))
			.map((key) => Reflect.getMetadata(key, controller));

		if (handlers.length === 0) {
			this.app.use(meta.path, router);
			this.loggerService.log(`[${meta.name}] => binded to [${meta.path}]`);
			return;
		}

		this.loggerService.log(`[${meta.name}] => binded to [${meta.path}]`);
		const handlerInitLogString = (
			method: string,
			path: string,
			handlers: BaseControllerRoute[],
		) => {
			const maxLengthAllMethods = handlers.reduce((acc, current) => {
				acc = current.method.length > acc ? current.method.length : acc;
				return acc;
			}, 0);
			const dif = maxLengthAllMethods - method.length;
			return `${' '.repeat(1)} -| [${method.toUpperCase()}] ${' '.repeat(
				dif,
			)}handler binded to => ${path}`;
		};
		for (const handler of handlers) {
			this.loggerService.log(handlerInitLogString(handler.method, handler.path, handlers));
			const currentHandlerMiddlewares = middlewares.filter(
				(middleware) => middleware.method === handler.handler.name,
			);
			const bindedHandler = handler.handler.bind(controller);

			if (currentHandlerMiddlewares.length > 0) {
				const bindedMiddlewares = currentHandlerMiddlewares.map(({ middleware }) =>
					middleware.execute.bind(middleware),
				);
				const pipeline = [...bindedMiddlewares, bindedHandler];
				router[handler.method](handler.path, pipeline);
			} else {
				router[handler.method](handler.path, bindedHandler);
			}
		}
		this.app.use(meta.path, router);
	}
	private useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}
	/**
	 * This method init the app
	 * @returns Promise<App>
	 */
	public async initialize(): Promise<App> {
		// Order first global middlewares
		this.useMiddlewares();
		// Then routes handlers
		this.useRoutes();
		// Finally exceptions filters | exceptions handlers
		this.useExceptionFilters();
		this.isInited = true;
		return this;
	}
	/**
	 * This method start server on Port
	 * @param port number
	 */
	public async start(port: number): Promise<void> {
		if (!this.isInited) {
			throw new Error(
				'You cant start the app without init first of all init the app and after start the app',
			);
		}
		this.server = this.app.listen(port, () => {
			this.loggerService.log(`Application started on http://localhost:${port}`);
		});
		process.on('uncaughtException', (err: Error) => {
			this.loggerService.error(err.message);
			process.exit(1);
		});
	}
}
