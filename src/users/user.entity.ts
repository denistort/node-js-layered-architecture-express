import { hash } from 'bcryptjs';
import 'reflect-metadata';
import { injectable } from 'inversify';

// @injectable()
export class UserEntity {
	private _password: string | undefined;
	constructor(private readonly _email: string, private readonly _username: string) {}

	get email(): string {
		return this._email;
	}
	get userName(): string {
		return this._username;
	}
	public async setPassword(password: string, salt: string | number): Promise<UserEntity> {
		this._password = await hash(password, salt);
		return this;
	}
}
