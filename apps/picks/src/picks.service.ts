import { Injectable } from '@nestjs/common';
import { CreatePicksDTO, UploadImageDTO, ValidObjectIdDTO } from './picks.dto';
import { NotFoundException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { Model } from 'mongoose';
import { Picks } from './picks.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from './picks.interface';

@Injectable()
export class PicksService {
    constructor(@InjectModel('Picks') private readonly picksModel: Model<Picks>) {}

    getHello(): string {
        return 'Hello from Picks service !';
    }

    async uploadedImage(id: ValidObjectIdDTO, image: any): Promise<Picks> {
        if (!isValidObjectId(id)) {
            throw new NotFoundException(`Pick with id ${id} not found !`);
        }

        return await this.picksModel.findByIdAndUpdate(id, { image: image.filename }, { new: true }).exec();
    }

    async create(picks: CreatePicksDTO): Promise<Picks> {
        const createdPicks = new this.picksModel(picks);
        return await createdPicks.save();
    }

    async findOne(id: ValidObjectIdDTO): Promise<Picks> {
        if (!isValidObjectId(id)) {
            throw new NotFoundException(`pick with id ${id} not found !`);
        }
        const result = await this.picksModel.findById(id).exec();
        if (!result) {
            throw new NotFoundException(`pick with id ${id} not found !`);
        }
        return result;
    }

    async update(id: ValidObjectIdDTO, picks: Picks): Promise<Picks> {
        if (!isValidObjectId(id)) {
            throw new NotFoundException(`Store with id ${id} not found !`);
        }

        return await this.picksModel.findByIdAndUpdate(id, picks, { new: true }).exec();
    }

    async delete(id: ValidObjectIdDTO): Promise<any> {
        if (!isValidObjectId(id)) {
            throw new NotFoundException(`pick with id ${id} not found !`);
        }

        const picks = await this.picksModel.findByIdAndDelete(id).exec();

        if (!picks) {
            throw new NotFoundException(`pick with id ${id} not found !`);
        }
        return picks;
    }

    // events
    async updateStoreData(newStoreData: any): Promise<any> {
        const updateFields: Record<string, any> = {};

        if (newStoreData.store.title !== undefined) {
            updateFields['store.title'] = newStoreData.store.title;
        }
        return await this.picksModel.updateMany({ 'store.store_id': newStoreData.storeId }, { $set: updateFields }, { new: true }).exec();
    }

    async updateOfferData(newOfferData: any): Promise<any> {
        const updateFields: Record<string, any> = {};

        if (newOfferData.current_offer.price != undefined) {
            updateFields['current_offer.price'] = newOfferData.current_offer.price;
        }

        if (newOfferData.current_offer.start_date != undefined) {
            updateFields['current_offer.start_date'] = newOfferData.current_offer.start_date;
        }

        if (newOfferData.current_offer.end_date != undefined) {
            updateFields['current_offer.end_date'] = newOfferData.current_offer.end_date;
        }

        if (newOfferData.current_offer.discount != undefined) {
            updateFields['current_offer.discount'] = newOfferData.current_offer.discount;
        }

        return await this.picksModel.updateMany({ _id: newOfferData.pick_Id }, { $set: updateFields }, { new: true }).exec();
    }
}
