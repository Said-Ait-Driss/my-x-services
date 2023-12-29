import { Injectable } from '@nestjs/common';
import { CreatePicksDTO ,UploadImageDTO ,ValidObjectIdDTO } from './picks.dto';
import { NotFoundException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { Model } from "mongoose"
import { Picks } from './picks.schema';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class PicksService {

  constructor(@InjectModel("Picks") private readonly picksModel:Model<Picks>){}



  getHello(): string {
    return 'Hello from Picks service !';
  }

  async create(image: any ,picks: CreatePicksDTO ): Promise<Picks> {

    picks.image = image.filename

    const createdPicks = new this.picksModel(picks)
    return await createdPicks.save()
  }

  async findOne(id: ValidObjectIdDTO ): Promise<Picks> {
    if(!isValidObjectId(id)){
      throw new NotFoundException(`pick with id ${id} not found !`)
    }
    const result = await this.picksModel.findById(id).exec()
    if(!result){
      throw new NotFoundException(`pick with id ${id} not found !`)
    }
    return result
  }

  async update(id: ValidObjectIdDTO, picks: Picks ): Promise<Picks> {
    if(!isValidObjectId(id)){
      throw new NotFoundException(`Store with id ${id} not found !`)
    }
    
    return await this.picksModel.findByIdAndUpdate(id,picks,{new: true}).exec();
  }

  async delete(id: ValidObjectIdDTO): Promise<any> {

    if(!isValidObjectId(id)){
      throw new NotFoundException(`pick with id ${id} not found !`)
    }

    const picks = await this.picksModel.findByIdAndDelete(id).exec()
    
    if(!picks){
      throw new NotFoundException(`pick with id ${id} not found !`)
    }
    return picks
  }


}
