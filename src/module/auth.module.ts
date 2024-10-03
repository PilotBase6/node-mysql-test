import { Module } from "@nestjs/common";

import { AuthControllers } from "src/controllers/auth.controller";

import { CreateUserService } from "src/services/auth/CreateUserService";
import { LoginService } from "src/services/auth/LoginService";
import { UserValidations } from "src/services/users/UserValidations";


@Module({
    imports: [],
    controllers: [AuthControllers],
    providers: [CreateUserService, UserValidations, LoginService],
})
export class AuthModule {}