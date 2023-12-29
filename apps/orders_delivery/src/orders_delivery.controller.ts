import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrdersDeliveryService } from './orders_delivery.service';
import { CreateOrders_deliveryDTO } from './orders_delivery.dto';
import { Orders_delivery } from './orders_delivery.schema';
import { ValidObjectIdDTO } from './orders_delivery.dto';

@Controller()
export class OrdersDeliveryController {
  constructor(private readonly ordersDeliveryService: OrdersDeliveryService) {}

  @Get()
  getHello(): string {
    return this.ordersDeliveryService.getHello();
  }

  @Post("create")
  create( @Body() order_delivery: CreateOrders_deliveryDTO ): Promise<Orders_delivery> {
    return this.ordersDeliveryService.create(order_delivery);
  }

  @Get(":id")
  findOne(@Param("id") id: ValidObjectIdDTO ): Promise<Orders_delivery> {
    return this.ordersDeliveryService.findOne(id);
  }

  @Get("client-orders-delivery/:client_id")
  findOrdersDeliveryOfClient(@Param("client_id") client_id:string): Promise<Orders_delivery[]> {
    return this.ordersDeliveryService.getOrdersDeliveryOfClient(client_id);
  }


  @Get("deliverer-orders-delivery/:deliverer_id")
  findOrdersDeliveryOfDeliverer(@Param("deliverer_id") deliverer_id:string): Promise<Orders_delivery[]> {
    return this.ordersDeliveryService.getOrdersDeliveryOfDeliverer(deliverer_id);
  }


  @Put(":id")
  update(@Param("id") id: ValidObjectIdDTO, @Body() order_delivery: Orders_delivery): Promise<Orders_delivery> {
    return this.ordersDeliveryService.update(id,order_delivery);
  }

  @Delete(":id")
  delete(@Param("id") id: ValidObjectIdDTO ): Promise<Orders_delivery> {
    return this.ordersDeliveryService.delete(id);
  }

}
