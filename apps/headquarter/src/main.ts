import { NestFactory } from '@nestjs/core';
import { HeadquarterModule } from './headquarter.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { myRabbitMqConfig } from 'utils/utils/constants';


async function bootstrap() { 
  const app = await NestFactory.create(HeadquarterModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [myRabbitMqConfig.rabbitMq_uri],
      queue: myRabbitMqConfig.headquarter.queue,
      queueOptions: {
        durable: true,
      },
    },
  });


  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.startAllMicroservices();
  await app.listen(3030);
  Logger.log(`Headquarter microservice running on port ${3030}`);
}
bootstrap();
