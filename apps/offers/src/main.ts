import { NestFactory } from '@nestjs/core';
import { OffersModule } from './offers.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { myRabbitMqConfig } from 'utils/utils/constants';

async function bootstrap() {
  const app = await NestFactory.create(OffersModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
        urls: [myRabbitMqConfig.rabbitMq_uri],
        queue: myRabbitMqConfig.offers.queue,
        queueOptions: {
            durable: true,
        },
    },
});
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.startAllMicroservices();
    await app.listen(3070);
  Logger.log(`Offers running on port ${3070}`);

}
bootstrap();
