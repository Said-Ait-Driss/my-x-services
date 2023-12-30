import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@nestjs-plus/rabbitmq';
import { myRabbitMqConfig } from 'utils/utils/constants';



@Injectable()
export class StoreRMQService {
  constructor() {}

  handleMessage(message: string) {
    console.log(`Store received message: ${message}`);
    // Process the message as needed
  }

}
