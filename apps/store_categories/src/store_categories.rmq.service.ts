import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { myRabbitMqConfig } from 'utils/utils/constants';

@Injectable()
export class StoreRMQCategoriesService {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [myRabbitMqConfig.rabbitMq_uri],
                queue: 'STORE_QUEUE'
            },
        });
    }

    sendMessage(pattern: string, message: string) {
        console.log("store category message : ",message);
        
        return this.client.emit(pattern, message);
    }
}
