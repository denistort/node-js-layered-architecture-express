import 'reflect-metadata';

export interface IModuleProps {
	services: Function[];
	controllers: Function[];
}

export function Module(options: IModuleProps) {
	return (constructor: Function) => {
		Reflect.defineMetadata('module', options, constructor.prototype);
	};
}
