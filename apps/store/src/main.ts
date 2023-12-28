import { NestFactory } from '@nestjs/core';
import { StoreModule } from './store.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(StoreModule);
  
  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  await app.listen(3020);

  Logger.log(`Store microservice running on port ${3020}`);

}
bootstrap();
