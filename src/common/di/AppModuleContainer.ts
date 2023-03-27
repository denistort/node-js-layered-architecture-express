import { ContainerModule, interfaces } from 'inversify';

export class AppModuleContainer {
	containerModule: ContainerModule;
	constructor() {
		this.containerModule = new ContainerModule(() => {})
	}

	register<T>() {
	}
}