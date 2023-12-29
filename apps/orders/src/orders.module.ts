import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersSchema } from './orders.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Orders', schema: OrdersSchema }]),
    MongooseModule.forRoot('mongodb://localhost:27017/orders-service', {
      useUnifiedTopology: true,
    } as import('mongoose').ConnectOptions),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
