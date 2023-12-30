import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import { myRabbitMqConfig } from 'utils/utils/constants';

// default exchange type is direct
@Injectable()
export class RabbitmqService {
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    constructor() {
        this.connect();
    }

    async connect() {
        this.connection = await amqp.connect(myRabbitMqConfig.rabbitMq_uri);
        this.channel = await this.connection.createChannel();

        // Declare a direct exchange named 'direct_exchange'
        await this.channel.assertExchange(myRabbitMqConfig.store.extchange, 'direct');
    }

    async sendToQueue(queue: string, message: string, routingKey: string) {
        await this.channel.assertQueue(queue);

        // used to send message to queue directly
        // this.channel.sendToQueue(queue,Buffer.from(message));

        // used to send message to a queue trough exachnge
        this.channel.publish('', queue, Buffer.from(message), { routingKey });
    }

    async consumeFromQueue(queue: string, callback: (msg: amqp.ConsumeMessage | null) => void) {
        await this.channel.assertQueue(queue);
        this.channel.consume(queue, callback, { noAck: true });
    }
}
