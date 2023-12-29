import { Module } from '@nestjs/common';
import { OrdersDeliveryController } from './orders_delivery.controller';
import { OrdersDeliveryService } from './orders_delivery.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Orders_deliverySchema } from './orders_delivery.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Orders_delivery', schema: Orders_deliverySchema },
    ]),
    MongooseModule.forRoot(
      'mongodb://localhost:27017/orders_delivery-service',
      {
        useUnifiedTopology: true,
      } as import('mongoose').ConnectOptions,
    ),
  ],
  controllers: [OrdersDeliveryController],
  providers: [OrdersDeliveryService],
})
export class OrdersDeliveryModule {}
