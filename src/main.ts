import { Container, ContainerModule, interfaces } from 'inversify';

import { ExceptionFilter } from './errors/exception.filter';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ILogger } from './logger/logger.interface';
import LoggerService from './logger/logger.service';
import { TYPES } from './types';
import { IUsersController } from './users/user.controller.interface';
import UsersController from './users/user.controller';
import { IUserService } from './users/user.service.interface';
import { UserService } from './users/user.service';
import { UserEntity } from './users/user.entity';
import App from './app';

import 'reflect-metadata';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
	// User
	bind<IUsersController>(TYPES.IUsersController).to(UsersController);
	bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();
	// bind<UserEntity>(TYPES.UserEntity).toSelf();
	// bind<interfaces.Newable<UserEntity>>(TYPES.UserEntity).toConstructor<UserEntity>(UserEntity);
	bind<App>(TYPES.Application).to(App);
});

async function bootstrap() {
	const container = new Container();
	container.load(appBindings);
	const app = container.get<App>(TYPES.Application);
	await app.initialize();
	await app.start(8080);

	return { app, container };
}
bootstrap();
