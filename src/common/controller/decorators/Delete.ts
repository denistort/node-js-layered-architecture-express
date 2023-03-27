import 'reflect-metadata';

export function Delete(path: string) {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const key = `${propertyKey}:handler`;
		Reflect.defineMetadata(
			key,
			{ path, method: 'delete', handler: descriptor.value },
			target,
		);
	};
}
