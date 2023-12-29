import { Injectable } from '@nestjs/common';
import { CreatePicks_orderDTO } from './picks_order.dto';
import { ValidObjectIdDTO } from './picks_order.dto';
import { NotFoundException } from '@nestjs/common';
import { Picks_order } from './picks.schema';
import { isValidObjectId } from 'mongoose';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class PicksOrderService {

  constructor(@InjectModel("Picks_order") private readonly picks_orderModel:Model<Picks_order>){}

  getHello(): string {
    return 'Hello from picks order service !';
  }

  async create(picks_order: CreatePicks_orderDTO ): Promise<Picks_order> {
    const createdPicks_order = new this.picks_orderModel(picks_order)
    return await createdPicks_order.save()
  }

  async findOne(id: ValidObjectIdDTO ): Promise<Picks_order> {
    if(!isValidObjectId(id)){
      throw new NotFoundException(`pick order with id ${id} not found !`)
    }
    const result = await this.picks_orderModel.findById(id).exec()
    if(!result){
      throw new NotFoundException(`pick order with id ${id} not found !`)
    }
    return result
  }

  async findPicksOfAnOrder(order_id:ValidObjectIdDTO): Promise<Picks_order[]> {
    if(!isValidObjectId(order_id)){
      throw new NotFoundException(`no picks with order id ${order_id} found !`)
    }

    const result = await this.picks_orderModel.find({order_id:order_id}).exec()

    if(!result){
      throw new NotFoundException(`no picks with order id ${order_id} found !`)
    }
    return result
  }

  async update(id: ValidObjectIdDTO, picks_order: Picks_order ): Promise<Picks_order> {
    if(!isValidObjectId(id)){
      throw new NotFoundException(`pick order with id ${id} not found !`)
    }
    
    return await this.picks_orderModel.findByIdAndUpdate(id,picks_order,{new: true}).exec();
  }

  async delete(id: ValidObjectIdDTO): Promise<any> {

    if(!isValidObjectId(id)){
      throw new NotFoundException(`pick order with id ${id} not found !`)
    }

    const picks_order = await this.picks_orderModel.findByIdAndDelete(id).exec()
    
    if(!picks_order){
      throw new NotFoundException(`pick order with id ${id} not found !`)
    }
    return picks_order
  }



}
