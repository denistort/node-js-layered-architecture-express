import 'reflect-metadata';
import { IsEmail, Length } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Not valid email' })
	email!: string;
	@Length(6, 30, { message: 'Password lenght should be from 6 char to 30' })
	password!: string;
}
