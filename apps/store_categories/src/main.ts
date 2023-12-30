import { NestFactory } from '@nestjs/core';
import { StoreCategoriesModule } from './store_categories.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { myRabbitMqConfig } from 'utils/utils/constants';

async function bootstrap() {
    const app = await NestFactory.create(StoreCategoriesModule);
    app.connectMicroservice({
        name: myRabbitMqConfig.store_category.name,
        transport: Transport.RMQ,
        options: {
            urls: [myRabbitMqConfig.rabbitMq_uri],
            queue: myRabbitMqConfig.store_category.queue,
            queueOptions: {
                durable: true,
            },
        },
    });

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.startAllMicroservices();
    await app.listen(3050);

    Logger.log(`Store_categories microservice running on port ${3050}`);
}
bootstrap();
