import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { myRabbitMqConfig } from 'utils/utils/constants';



@Injectable()
export class StoreRMQService {
  private client: ClientProxy;

  constructor() {
  
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
          urls: [myRabbitMqConfig.rabbitMq_uri],
          queue: myRabbitMqConfig.store.clients.picks.queue
      },
  });

  }

  sendMessage(pattern: string, message: string) {
    console.log(`Store send message: ${message}`);
    // Process the message as needed
    return this.client.emit(pattern, message);

  }

}
