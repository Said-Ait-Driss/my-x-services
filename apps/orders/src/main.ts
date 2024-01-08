import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { myRabbitMqConfig } from 'utils/utils/constants';

async function bootstrap() {
    const app = await NestFactory.create(OrdersModule);
    app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: [myRabbitMqConfig.rabbitMq_uri],
            queue: myRabbitMqConfig.orders.queue,
            queueOptions: {
                durable: true,
            },
        },
    });
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.startAllMicroservices();
    await app.listen(3080);
    Logger.log(`Orders running on port ${3080}`);
}
bootstrap();
