import { NestFactory } from '@nestjs/core';
import { ContactInfosModule } from './contact_infos.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { myRabbitMqConfig } from 'utils/utils/constants';

async function bootstrap() {
    const app = await NestFactory.create(ContactInfosModule);
    app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: [myRabbitMqConfig.rabbitMq_uri],
            queue: myRabbitMqConfig.contact_infos.queue,
            queueOptions: {
                durable: true,
            },
        },
    });

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.startAllMicroservices();
    await app.listen(3040);
    Logger.log(`contact_infos microservice running on port ${3040}`);
}
bootstrap();
