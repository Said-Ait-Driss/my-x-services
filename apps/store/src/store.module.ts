import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreSchema } from './store.schema';
import { StoreRMQService } from './store.rmq.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Store', schema: StoreSchema }]),
        MongooseModule.forRoot('mongodb://localhost:27017/store-service', {
            useUnifiedTopology: true,
        } as import('mongoose').ConnectOptions),
    ],
    controllers: [StoreController],
    providers: [StoreService, StoreRMQService],
})
export class StoreModule {}

// extchange types:
/*
Fanout: to broadcast messages to all subscribed services
Direct: Use this when you need a straightforward one-to-one routing mechanism based on exact matching of routing keys
Topic:  Use this when you need more advanced routing based on wildcard matches between the routing key and routing pattern.
Headers: Use this when routing is determined by message header attributes rather than routing keys.
*/
