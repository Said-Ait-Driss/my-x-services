import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { myRabbitMqConfig } from 'utils/utils/constants';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: [myRabbitMqConfig.rabbitMq_uri],
            queue: myRabbitMqConfig.user.queue,
            queueOptions: {
                durable: true,
            },
        },
    });

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.startAllMicroservices();
    await app.listen(3010);
    Logger.log(`User microservice running on port ${3010}`);
}
bootstrap();
