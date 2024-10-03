import { Module } from "@nestjs/common";

import { UserControllers } from "src/controllers/user.controller";
import { GetAllUserService } from "src/services/users/GetAllUserService";
import { GetUserByIdService } from "src/services/users/GetUserById";
import { UpdateUserService } from "src/services/users/UpdateUserService";

import { JwtModule } from "@nestjs/jwt";



@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: "nodetest",
            signOptions: { expiresIn: "3600s" },
        }),
    ],
    controllers: [UserControllers],
    providers: [GetAllUserService, GetUserByIdService, UpdateUserService],
})
export class UserModule {}
