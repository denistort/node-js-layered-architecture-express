import 'reflect-metadata';


export function Post(path: string) {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const key = `${propertyKey}:handler`;
		Reflect.defineMetadata(
			key,
			{ path, method: 'post', handler: descriptor.value, middlewares: [] },
			target,
		);
	};
}
