import { Module } from "@nestjs/common";
import { AuthModule } from "src/module/auth.module";
import { DatabaseModule } from "src/module/database.module";
import { UserModule } from "src/module/user.module";

@Module({
    imports: [UserModule, AuthModule, DatabaseModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
