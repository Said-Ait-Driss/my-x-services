import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { myRabbitMqConfig } from 'utils/utils/constants';

@Injectable()
export class UserRMQService {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [myRabbitMqConfig.rabbitMq_uri],
                queue: myRabbitMqConfig.user.clients.orders.queue,
            },
        });
    }

    sendMessage(pattern: string, message: string) {
        console.log(`user send message: ${message}`);
        // Process the message as needed
        return this.client.emit(pattern, message);
    }
}
