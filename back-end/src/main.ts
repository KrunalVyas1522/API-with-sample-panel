import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './env';
import { SwaggerLoader } from './utils/swaggerconfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerLoader(app);
  app.enableCors();
  await app.listen(env.PORT);
}
bootstrap();
