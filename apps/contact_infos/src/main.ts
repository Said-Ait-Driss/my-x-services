import { NestFactory } from '@nestjs/core';
import { ContactInfosModule } from './contact_infos.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(ContactInfosModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3040);
  Logger.log(`contact_infos microservice running on port ${3040}`);
}
bootstrap();
