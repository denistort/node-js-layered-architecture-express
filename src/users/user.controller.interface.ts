import { Handler } from 'express';
export interface IUsersController {
	login: Handler;
	register: Handler;
}
