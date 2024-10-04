import { Module } from "@nestjs/common";

import { UserControllers } from "src/controllers/user.controller";
import { GetAllUserService } from "src/services/users/GetAllUserService";
import { GetUserByIdService } from "src/services/users/GetUserById";
import { UpdateUserService } from "src/services/users/UpdateUserService";
import { UserRepository } from "src/repositories/user.repository";

import { JwtModule } from "@nestjs/jwt";
import { UserValidations } from "src/services/users/UserValidations";
import { SedeRepository } from "src/repositories/sede.repository";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: "nodetest",
            signOptions: { expiresIn: "3600s" },
        }),
        UserValidations,
    ],
    controllers: [UserControllers],
    providers: [
        GetAllUserService,
        GetUserByIdService,
        UpdateUserService,
        UserValidations,
        UserRepository,
        SedeRepository,
    ],
    exports: [UserRepository, UserValidations],
})
export class UserModule {}
