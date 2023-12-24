import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("auth/api")
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { 
      host: 'localhost',
      port: 4000
    }
  })

  await app.startAllMicroservices();
  await app.listen(3000);
  Logger.log(`Auth microservice running on port ${3000}`);
}
bootstrap();