import { NestFactory } from '@nestjs/core';
import { PicksModule } from './picks.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(PicksModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3060);
  Logger.log(`Picks running on port ${3060}`);

  
}
bootstrap();
