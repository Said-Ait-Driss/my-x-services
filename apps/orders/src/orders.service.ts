import { Injectable } from '@nestjs/common';
import { CreateOrdersDTO, ValidObjectIdDTO } from './orders.dto';
import { Orders } from './orders.schema';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId } from 'mongoose';


@Injectable()
export class OrdersService {

  constructor(
    @InjectModel('Orders') private readonly OrdersModel: Model<Orders>,
  ) {}


  getHello(): string {
    return 'Hello from orders service !';
  }

  async create(order: CreateOrdersDTO): Promise<Orders> {
    const createdOrder = new this.OrdersModel(order);
    return await createdOrder.save();
  }

  async findOne(id: ValidObjectIdDTO): Promise<Orders> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`order with id ${id} not found !`);
    }
    const result = await this.OrdersModel.findById(id).exec();
    if (!result) {
      throw new NotFoundException(`order with id ${id} not found !`);
    }
    return result;
  }

  async getClientOrders(client_id: string): Promise<Orders[]> {

    const result = await this.OrdersModel.find({
      client_id: client_id
    }).exec();

    if (!result) {
      throw new NotFoundException(`client with id ${client_id} has no orders yet !`);
    }
    return result;
  }

  async update(id: ValidObjectIdDTO, order: Orders): Promise<Orders> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`order with id ${id} not found !`);
    }

    return await this.OrdersModel.findByIdAndUpdate(id, order, {
      new: true,
    }).exec();
  }

  async delete(id: ValidObjectIdDTO): Promise<any> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`order with id ${id} not found !`);
    }

    const picks = await this.OrdersModel.findByIdAndDelete(id).exec();

    if (!picks) {
      throw new NotFoundException(`order with id ${id} not found !`);
    }
    return picks;
  }

}
