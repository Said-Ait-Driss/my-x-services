import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3080);
  Logger.log(`Orders running on port ${3080}`);
}
bootstrap();
