import { NestFactory } from '@nestjs/core';
import { OffersModule } from './offers.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(OffersModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3070);
  Logger.log(`Offers running on port ${3070}`);

}
bootstrap();
