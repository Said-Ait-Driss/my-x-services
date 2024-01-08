import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrdersDTO, ValidObjectIdDTO } from './orders.dto';
import { Orders } from './orders.schema';
import { OrdersInterface } from './orders.interface';
import { MessagePattern, Ctx, RmqContext, Payload  } from '@nestjs/microservices';

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

    @Get('headquarter-orders/:headquarter_id')
    findHeadquarterOrders(@Param('headquarter_id') headquarter_id: string): Promise<Orders[]> {
        return this.ordersService.getHeadquarterOrders(headquarter_id);
    }

    @Put(':id')
    update(@Param('id') id: ValidObjectIdDTO, @Body() order: OrdersInterface): Promise<Orders> {
        return this.ordersService.update(id, order);
    }

    @Delete(':id')
    delete(@Param('id') id: ValidObjectIdDTO): Promise<Orders> {
        return this.ordersService.delete(id);
    }


    // events

    @MessagePattern("CLIENT_INFOS_UPDATED")
    update_user_info(@Payload() data: any, @Ctx() context: RmqContext){
        let newUserData = JSON.parse(data)

        console.log("new user data : ",newUserData);
        
        this.ordersService.updateUserData(newUserData)
  
        console.log(`Pattern: ${context.getPattern()}`);
    }
}
