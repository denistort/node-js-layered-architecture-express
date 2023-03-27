import { Module } from "../common/di/Module";
import UsersController from "./user.controller";
import { UserService } from "./user.service";

@Module({
	controllers: [UsersController],
	services: [UserService]
})
export class UserModule {}