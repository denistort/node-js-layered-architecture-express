import 'reflect-metadata';
import { IConfigService } from './config.service.interface';
import { config, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
	private result: DotenvParseOutput | undefined;
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		const result = config();
		if (result.error) {
			this.loggerService.error('[ConfigService] Error with config');
		} else {
			this.result = result.parsed as DotenvParseOutput;
			this.loggerService.log('[ConfigService] is inited');
		}
	}
	get<T extends string | number>(key: string): T {
		return this.result[key] as T;
	}
}
