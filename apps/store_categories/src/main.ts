import { NestFactory } from '@nestjs/core';
import { StoreCategoriesModule } from './store_categories.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(StoreCategoriesModule);
    // Enable validation globally
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3050);

  Logger.log(`Store_categories microservice running on port ${3050}`);

}
bootstrap();
