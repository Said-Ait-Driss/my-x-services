import { NestFactory } from '@nestjs/core';
import { PicksModule } from './picks.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { myRabbitMqConfig } from 'utils/utils/constants';

async function bootstrap() {
    const app = await NestFactory.create(PicksModule);
    app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: [myRabbitMqConfig.rabbitMq_uri],
            queue: myRabbitMqConfig.picks.queue,
            queueOptions: {
                durable: true,
            },
        },
    });

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.startAllMicroservices();
    await app.listen(3060);
    Logger.log(`Picks running on port ${3060}`);
}
bootstrap();
