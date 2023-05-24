import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

export class Swagger {
  static build(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('API User')
      .setDescription('by Josiney Junior')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    

    SwaggerModule.setup('api-docs', app, document);
  }
}
