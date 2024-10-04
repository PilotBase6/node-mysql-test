import { Module } from "@nestjs/common";

import { AuthControllers } from "src/controllers/auth.controller";
import { UserRepository } from "src/repositories/user.repository";

import { CreateUserService } from "src/services/auth/CreateUserService";
import { LoginService } from "src/services/auth/LoginService";
import { UserModule } from "./user.module";
import { SedeRepository } from "src/repositories/sede.repository";

@Module({
    imports: [UserModule],
    controllers: [AuthControllers],
    providers: [CreateUserService, LoginService, UserRepository, SedeRepository],
    exports: [UserRepository],
})
export class AuthModule {}
