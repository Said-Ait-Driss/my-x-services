import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Orders_delivery } from './orders_delivery.schema';
import { isValidObjectId } from 'mongoose';
import { CreateOrders_deliveryDTO } from './orders_delivery.dto';
import { ValidObjectIdDTO } from './orders_delivery.dto';


@Injectable()
export class OrdersDeliveryService {

  constructor(@InjectModel("Orders_delivery") private readonly orders_deliveryModel:Model<Orders_delivery>){}


  getHello(): string {
    return 'Hello from orders delivery service !';
  }

  async create(order_delivery: CreateOrders_deliveryDTO ): Promise<Orders_delivery> {
    const createdOrder_delivery = new this.orders_deliveryModel(order_delivery)
    return await createdOrder_delivery.save()
  }

  async findOne(id: ValidObjectIdDTO ): Promise<Orders_delivery> {
    if(!isValidObjectId(id)){
      throw new NotFoundException(`order delivery with id ${id} not found !`)
    }
    const result = await this.orders_deliveryModel.findById(id).exec()
    if(!result){
      throw new NotFoundException(`order delivery with id ${id} not found !`)
    }
    return result
  }

  async getOrdersDeliveryOfClient(client_id:string): Promise<Orders_delivery[]> {
    
    const result = await this.orders_deliveryModel.find({client_id:client_id}).exec()

    if(!result){
      throw new NotFoundException(`client with id ${client_id} hasn't made any order yet ! `);
    }
    return result
  }

  async getOrdersDeliveryOfDeliverer(deliverer_id:string): Promise<Orders_delivery[]> {
    const result = await this.orders_deliveryModel.find({deliverer_id:deliverer_id}).exec()

    if(!result){
      throw new NotFoundException(`deliverer with id ${deliverer_id} hasn't delivered anything yet !`);
    }
    return result
  }


  async update(id: ValidObjectIdDTO, order_delivery: Orders_delivery ): Promise<Orders_delivery> {
    if(!isValidObjectId(id)){
      throw new NotFoundException(`order delivery with id ${id} not found !`)
    }
    
    return await this.orders_deliveryModel.findByIdAndUpdate(id,order_delivery,{new: true}).exec();
  }

  async delete(id: ValidObjectIdDTO): Promise<any> {

    if(!isValidObjectId(id)){
      throw new NotFoundException(`order delivery with id ${id} not found !`)
    }

    const order_delivery = await this.orders_deliveryModel.findByIdAndDelete(id).exec()
    
    if(!order_delivery){
      throw new NotFoundException(`order delivery with id ${id} not found !`)
    }
    return order_delivery
  }

}
