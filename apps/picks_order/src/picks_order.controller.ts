import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PicksOrderService } from './picks_order.service';
import { CreatePicks_orderDTO, ValidObjectIdDTO } from './picks_order.dto';
import { Picks_order } from './picks.schema';

@Controller()
export class PicksOrderController {
  constructor(private readonly picksOrderService: PicksOrderService) {}

  @Get()
  getHello(): string {
    return this.picksOrderService.getHello();
  }

  @Post("create")
  create( @Body() picks_order: CreatePicks_orderDTO ): Promise<Picks_order> {
    return this.picksOrderService.create(picks_order);
  }

  @Get(":id")
  findOne(@Param("id") id: ValidObjectIdDTO ): Promise<Picks_order> {
    return this.picksOrderService.findOne(id);
  }

  @Get("picks-of-order/:order_id")
  findPicksOfAnOrder(@Param("order_id") order_id: ValidObjectIdDTO ): Promise<Picks_order[]> {
    return this.picksOrderService.findPicksOfAnOrder(order_id);
  }

  @Put(":id")
  update(@Param("id") id: ValidObjectIdDTO, @Body() picks_order: Picks_order): Promise<Picks_order> {
    return this.picksOrderService.update(id,picks_order);
  }

  @Delete(":id")
  delete(@Param("id") id: ValidObjectIdDTO ): Promise<Picks_order> {
    return this.picksOrderService.delete(id);
  }
}
