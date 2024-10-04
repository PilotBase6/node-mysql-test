import { Module } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { Sede } from "src/entities/sede.schema";
import { User } from "src/entities/user.schema";

export const databaseProviders = [
    {
        provide: "SEQUELIZE",
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: "mysql",
                host: "node-mysql",
                port: 3306,
                username: "testnode",
                password: "testnode",
                database: "testdb",
            });
            sequelize.addModels([User, Sede]);
            await sequelize.sync();
            return sequelize;
        },
    },
];

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
