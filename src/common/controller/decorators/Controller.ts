import 'reflect-metadata';

export interface IControllerMetaData {
	path: string;
	created_at: string;
	name: string;
}

export function Controller(path: string | undefined) {
	return (constructor: Function) => {
		const controllerMetaData: IControllerMetaData = {
			path: path || '/',
			created_at: new Date().toLocaleDateString(),
			name: constructor.name,
		};
		Reflect.defineMetadata('controllerMetaData', controllerMetaData, constructor.prototype);
	};
}
