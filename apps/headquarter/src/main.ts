import { NestFactory } from '@nestjs/core';
import { HeadquarterModule } from './headquarter.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(HeadquarterModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3030);
  Logger.log(`Headquarter microservice running on port ${3030}`);
}
bootstrap();
