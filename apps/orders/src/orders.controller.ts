import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrdersDTO, ValidObjectIdDTO } from './orders.dto';
import { Orders } from './orders.schema';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getHello(): string {
    return this.ordersService.getHello();
  }

  @Post('create')
  create(@Body() offers: CreateOrdersDTO): Promise<Orders> {
    return this.ordersService.create(offers);
  }

  @Get(':id')
  findOne(@Param('id') id: ValidObjectIdDTO): Promise<Orders> {
    return this.ordersService.findOne(id);
  }

  @Get('client-orders/:client_id')
  findPickOffers(@Param('client_id') client_id: string): Promise<Orders[]> {
    return this.ordersService.getClientOrders(client_id);
  }

  @Put(':id')
  update(
    @Param('id') id: ValidObjectIdDTO,
    @Body() offers: Orders,
  ): Promise<Orders> {
    return this.ordersService.update(id, offers);
  }

  @Delete(':id')
  delete(@Param('id') id: ValidObjectIdDTO): Promise<Orders> {
    return this.ordersService.delete(id);
  }
}
