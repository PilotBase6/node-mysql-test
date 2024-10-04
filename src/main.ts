import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AuthModule } from "./module/auth.module";
import { DatabaseModule } from "./module/database.module";
import { UserModule } from "./module/user.module";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    const apiPath = "api";
    app.setGlobalPrefix(apiPath);

    const config = new DocumentBuilder()
        .setTitle("Node Test API")
        .setDescription("API for test Node.js")
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config, {
        include: [AppModule, UserModule, AuthModule, DatabaseModule],
    });
    SwaggerModule.setup(`${apiPath}/swagger`, app, document);

    await app.listen(5500);
}
void bootstrap();
