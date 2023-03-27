import 'reflect-metadata';

export function Patch(path: string) {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const key = `${propertyKey}:handler`;
		Reflect.defineMetadata(
			key,
			{ path, method: 'patch', handler: descriptor.value, middlewares: [] },
			target,
		);
	};
}
