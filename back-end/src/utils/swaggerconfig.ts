import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const SwaggerLoader = (app: INestApplication) : void => {
    const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('This is API Documentation')
    .setVersion('1.0')
    .build();

    const document = SwaggerModule.createDocument(app,config);

    SwaggerModule.setup('/api', app, document)
}