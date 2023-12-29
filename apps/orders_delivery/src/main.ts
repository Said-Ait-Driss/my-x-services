import { NestFactory } from '@nestjs/core';
import { OrdersDeliveryModule } from './orders_delivery.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(OrdersDeliveryModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(4000);
  Logger.log(`Orders delivery running on port ${4000}`);
}
bootstrap();