import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { myRabbitMqConfig } from 'utils/utils/constants';

@Injectable()
export class HeadquarterRMQService {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [myRabbitMqConfig.rabbitMq_uri],
                queue: myRabbitMqConfig.headquarter.clients.store.queue,
            },
        });
    }

    sendMessage(pattern: string, message: string) {
        return this.client.emit(pattern, message);
    }
}
