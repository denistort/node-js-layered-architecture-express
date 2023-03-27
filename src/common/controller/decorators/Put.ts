import 'reflect-metadata';

export function Put(path: string) {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const key = `${propertyKey}:handler`;
		Reflect.defineMetadata(
			key,
			{ path, method: 'put', handler: descriptor.value, middlewares: [] },
			target,
		);
	};
}
