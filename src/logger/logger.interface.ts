export interface ILogger {
	log: (...args: unknown[]) => void;

	warn: (...args: unknown[]) => void;

	error: (...args: unknown[]) => void;
}
