# Layered Express app with Controllers decorators nest js like

## What does this express template contain?

1. DI using inversify
2. Custom decoarotors which created by me, for register controllers and handlers.
3. Clean Architecture
4. 100% Testable
5. Exception Filters
6. Middlewares
7. Custom Http Errors
8. Validation Pipes

## Simple example how looks controller

```typescript
@Controller('/users')
@injectable()
export default class UsersController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IUserService) private userService: IUserService,
	) {}

	@Get('/login')
	public login(_req: Request, res: Response): void {
		throw new HttpError(401, 'ошибка авторизации');
	}

	@ValidationPipe(UserRegisterDto)
	@Post('/register')
	public async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		_next: NextFunction,
	): Promise<void> {
		const user = await this.userService.createUser(body);
		res.status(201).json(user);
	}
}
```
