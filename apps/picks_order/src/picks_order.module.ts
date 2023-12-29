import { Module } from '@nestjs/common';
import { PicksOrderController } from './picks_order.controller';
import { PicksOrderService } from './picks_order.service';
import { Picks_orderSchema } from './picks.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Picks_order', schema: Picks_orderSchema },
    ]),
    MongooseModule.forRoot('mongodb://localhost:27017/picks_order-service', {
      useUnifiedTopology: true,
    } as import('mongoose').ConnectOptions),
  ],
  controllers: [PicksOrderController],
  providers: [PicksOrderService],
})
export class PicksOrderModule {}
