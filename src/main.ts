import { ConsoleLogger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { ApplicationVariables } from './config/env';
import { Swagger } from './config/swagger';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  const envFile = app.get(ConfigService);

  app.enableCors({ origin: '*' });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(new ValidationPipe({}));
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });

  Swagger.build(app);

  const applicationPort =
    envFile.get<ApplicationVariables>('applicationPort').port;

  await app.listen(applicationPort);

  const log = new ConsoleLogger();

  log.log(`App running on port ${applicationPort}`);
  log.log(`API docs: ${await app.getUrl()}/api-docs`);
  

  return app;
}
bootstrap();
