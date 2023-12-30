import { NestFactory } from '@nestjs/core';
import { StoreModule } from './store.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { myRabbitMqConfig } from 'utils/utils/constants';


async function bootstrap() {
  const app = await NestFactory.create(StoreModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [myRabbitMqConfig.rabbitMq_uri],
      queue: myRabbitMqConfig.store.queue,
      queueOptions: {
        durable: true,
      },
    },
  });

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.startAllMicroservices();
  await app.listen(3020);

  Logger.log(`Store microservice running on port ${3020}`);

}
bootstrap();
