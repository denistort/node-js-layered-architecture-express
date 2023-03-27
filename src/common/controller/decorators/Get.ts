import 'reflect-metadata';

export function Get(path: string) {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const key = `${propertyKey}:handler`;
		Reflect.defineMetadata(
			key,
			{ path, method: 'get', handler: descriptor.value, middlewares: [] },
			target,
		);
	};
}
