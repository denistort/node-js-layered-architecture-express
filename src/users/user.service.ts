import 'reflect-metadata';
import { injectable, inject, interfaces } from 'inversify';

import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserEntity } from './user.entity';
import { IUserService } from './user.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		// @inject(TYPES.UserEntity) private userEntity: interfaces.Newable<UserEntity>
		) {}

	public async login(dto: UserLoginDto): Promise<void> {
		console.log(dto);
	}

	public async createUser(dto: UserRegisterDto): Promise<UserEntity | null> {
		const user = new UserEntity(dto.email, dto.name);
		return await user.setPassword(dto.password, 10);
	}
}
