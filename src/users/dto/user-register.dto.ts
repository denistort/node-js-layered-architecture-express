import 'reflect-metadata';
import { IsNotEmpty, Length } from 'class-validator';
import { UserLoginDto } from './user-login.dto';

export class UserRegisterDto extends UserLoginDto {
	@IsNotEmpty({ message: 'Name cant be empty ' })
	@Length(3, 30, { message: 'Name length must be from 3 to 30 characters' })
	name!: string;
}
