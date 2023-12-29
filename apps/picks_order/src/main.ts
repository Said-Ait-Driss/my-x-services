import { NestFactory } from '@nestjs/core';
import { PicksOrderModule } from './picks_order.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(PicksOrderModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3090);
  Logger.log(`Picks_order running on port ${3090}`);
}
bootstrap();
