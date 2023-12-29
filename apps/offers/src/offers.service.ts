import { Injectable } from '@nestjs/common';
import { CreateOffersDTO, ValidObjectIdDTO } from './offers.dto';
import { Offers } from './offers.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class OffersService {
  constructor(
    @InjectModel('Offers') private readonly OffersModel: Model<Offers>,
  ) {}

  getHello(): string {
    return 'Hello From offers service !';
  }

  async create(offer: CreateOffersDTO): Promise<Offers> {
    const createdOffer = new this.OffersModel(offer);
    return await createdOffer.save();
  }

  async findOne(id: ValidObjectIdDTO): Promise<Offers> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`offer with id ${id} not found !`);
    }
    const result = await this.OffersModel.findById(id).exec();
    if (!result) {
      throw new NotFoundException(`offer with id ${id} not found !`);
    }
    return result;
  }

  async getPickOffers(pick_id: ValidObjectIdDTO): Promise<Offers[]> {
    // if (!isValidObjectId(pick_id)) {
    //   throw new NotFoundException(
    //     `no offer of this pick id ${pick_id} found !`,
    //   );
    // }

    const result = await this.OffersModel.find({
      picks_id: pick_id,
    })
      .sort({ start_date: 'desc' }) // Sort by start_date in descending order
      .exec();
    
    if (!result) {
      throw new NotFoundException(
        `no offer of this pick id ${pick_id} found !`,
      );
    }
    return result;
  }

  async getLatest(pick_id: ValidObjectIdDTO): Promise<Offers> {
    if (!isValidObjectId(pick_id)) {
      throw new NotFoundException(
        `offer of this pick id ${pick_id} not found !`,
      );
    }
    const currentDate = new Date();

    const result = await this.OffersModel.findOne({
      picks_id: pick_id,
      start_date: { $lte: currentDate }, // Offer starts before or on the current date
      end_date: { $gte: currentDate }, // Offer ends after or on the current date
    })
      .sort({ start_date: 'desc' }) // Sort by start_date in descending order
      .exec();
    
    if (!result) {
      throw new NotFoundException(
        `offer of this pick id ${pick_id} not found !`,
      );
    }
    return result;
  }

  async update(id: ValidObjectIdDTO, offer: Offers): Promise<Offers> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`offer with id ${id} not found !`);
    }

    return await this.OffersModel.findByIdAndUpdate(id, offer, {
      new: true,
    }).exec();
  }

  async delete(id: ValidObjectIdDTO): Promise<any> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`offer with id ${id} not found !`);
    }

    const picks = await this.OffersModel.findByIdAndDelete(id).exec();

    if (!picks) {
      throw new NotFoundException(`offer with id ${id} not found !`);
    }
    return picks;
  }
}
