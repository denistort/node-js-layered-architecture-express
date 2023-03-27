import 'reflect-metadata';
import { Request, NextFunction, Response } from 'express';
import { inject, injectable } from 'inversify';

import { Get } from '../common/controller/decorators/Get';
import { HttpError } from '../errors/http.error';
import { ILogger } from '../logger/logger.interface';
import { Controller } from '../common/controller/decorators/Controller';
import { Post } from '../common/controller/decorators/Post';

import { TYPES } from '../types';
import { IUsersController } from './user.controller.interface';
import { IUserService } from './user.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { ValidationPipe } from '../common/controller/decorators/ValidationPipe';

@Controller('/users')
@injectable()
export default class UsersController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IUserService) private userService: IUserService,
	) {}

	@Get('/login')
	public login(_req: Request, res: Response): void {
		throw new HttpError(401, 'ошибка авторизации');
		// this.send(res, 200, { text: 'hello its me' });
	}

	@ValidationPipe(UserRegisterDto)
	@Post('/register')
	public async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		_next: NextFunction,
	): Promise<void> {
		const user = await this.userService.createUser(body);
		res.status(201).json(user);
	}
}
