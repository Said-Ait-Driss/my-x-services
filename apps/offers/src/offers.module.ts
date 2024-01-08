import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { OffersSchema } from './offers.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { OfferRMQService } from './offers.rmq.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Offers', schema: OffersSchema }]),
        MongooseModule.forRoot('mongodb://localhost:27017/offers-service', {
            useUnifiedTopology: true,
        } as import('mongoose').ConnectOptions),
    ],
    controllers: [OffersController],
    providers: [OffersService, OfferRMQService],
})
export class OffersModule {}
