import { Injectable } from '@nestjs/common';
import { CreateOffersDTO, ValidObjectIdDTO } from './offers.dto';
import { Offers } from './offers.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { OfferRMQService } from './offers.rmq.service';

@Injectable()
export class OffersService {
    constructor(
        @InjectModel('Offers') private readonly OffersModel: Model<Offers>,
        private offerRMQService: OfferRMQService,
    ) {}

    getHello(): string {
        return 'Hello From offers service !';
    }

    async create(offer: CreateOffersDTO): Promise<Offers> {
        const createdOffer = new this.OffersModel(offer);
        const result: any = await createdOffer.save();

        if (result) {
            let pick_Id = result.picks_id;
            console.log('result ', result);
            console.log('pick_Id ', pick_Id);

            const lastOfferOfPick: any = await this.getLatest(pick_Id);
            if (lastOfferOfPick) {
                let data = {
                    current_offer: {
                        ...lastOfferOfPick._doc,
                    },
                    pick_Id,
                };

                this.offerRMQService.sendMessage('OFFER_UPDATED', JSON.stringify(data));
            }
        }
        return result;
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
        if (!isValidObjectId(pick_id)) {
            throw new NotFoundException(`no offer of this pick id ${pick_id} found !`);
        }

        const result = await this.OffersModel.find({
            picks_id: pick_id,
        })
            .sort({ start_date: 'desc' }) // Sort by start_date in descending order
            .exec();

        if (!result) {
            throw new NotFoundException(`no offer of this pick id ${pick_id} found !`);
        }
        return result;
    }

    async getLatest(pick_id: ValidObjectIdDTO): Promise<Offers> {
        if (!isValidObjectId(pick_id)) {
            throw new NotFoundException(`offer of this pick id ${pick_id} not found !`);
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
            throw new NotFoundException(`offer of this pick id ${pick_id} not found !`);
        }
        return result;
    }

    async update(id: ValidObjectIdDTO, pick_id: ValidObjectIdDTO, offer: Offers): Promise<Offers> {
        if (!isValidObjectId(id)) {
            throw new NotFoundException(`offer with id ${id} not found !`);
        }

        const result = await this.OffersModel.findByIdAndUpdate(id, offer, {
            new: true,
        }).exec();

        if (result) {
            const lastOfferOfPick: any = await this.getLatest(pick_id);
            if (lastOfferOfPick) {
                let data = {
                    current_offer: {
                        ...lastOfferOfPick._doc,
                    },
                    pick_Id: pick_id,
                };

                this.offerRMQService.sendMessage('OFFER_UPDATED', JSON.stringify(data));
            }
        }
        return result;
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
