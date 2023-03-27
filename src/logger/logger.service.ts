import { Logger, ILogObj } from 'tslog';
import { injectable } from 'inversify';
import { ILogger } from './logger.interface';
import 'reflect-metadata';

@injectable()
export default class LoggerService implements ILogger {
	logger: Logger<ILogObj>;
	constructor() {
		this.logger = new Logger({
			hideLogPositionForProduction: true,
		});
	}

	public log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	public warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}

	public error(...args: unknown[]): void {
		this.logger.error(...args);
	}
}
