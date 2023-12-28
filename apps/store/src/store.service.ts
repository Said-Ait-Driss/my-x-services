import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose"
import { Store } from './store.schema';
import { NotFoundException } from '@nestjs/common';
import {CreateStoreDTO,ValidObjectIdDTO } from './store.dto';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class StoreService {

  constructor(@InjectModel("Store") private readonly storeModel:Model<Store>){}

  getHello(): string {
    return 'Hello From store service !';
  }

  async create(image: any ,store: CreateStoreDTO ): Promise<Store> {


    store.image = image.filename

    if(!store.contact_info_id){
      store.contact_info_id = '-1'
    }
    
    if(!store.longitude){
      store.longitude = ''
    }

    if(!store.latitude){
      store.latitude = ''
    }

    
    const createdStore = new this.storeModel(store)
    return await createdStore.save()
  }

  async findOne(id: ValidObjectIdDTO ): Promise<Store> {
    if(!isValidObjectId(id)){
      throw new NotFoundException(`Store with id ${id} not found !`)
    }
    const result = await this.storeModel.findById(id).exec()
    if(!result){
      throw new NotFoundException(`Store with id ${id} not found !`)
    }
    return result
  }

  async update(id: ValidObjectIdDTO, store: Store ): Promise<Store> {
    if(!isValidObjectId(id)){
      throw new NotFoundException(`Store with id ${id} not found !`)
    }
    
    return await this.storeModel.findByIdAndUpdate(id,store,{new: true}).exec();
  }

  async delete(id: ValidObjectIdDTO): Promise<any> {

    if(!isValidObjectId(id)){
      throw new NotFoundException(`Store with id ${id} not found !`)
    }

    const store = await this.storeModel.findByIdAndDelete(id).exec()
    
    if(!store){
      throw new NotFoundException(`Store with id ${id} not found !`)
    }
    return store
  }

}
