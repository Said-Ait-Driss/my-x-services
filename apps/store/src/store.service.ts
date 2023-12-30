import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from './store.schema';
import { NotFoundException } from '@nestjs/common';
import { CreateStoreDTO, ValidObjectIdDTO } from './store.dto';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class StoreService {
    constructor(@InjectModel('Store') private readonly storeModel: Model<Store>) {}

    getHello(): string {
        return 'Hello From store service !';
    }

    async create(store: CreateStoreDTO): Promise<Store> {
        store.image = '';

        if (!store.longitude) {
            store.longitude = '';
        }

        if (!store.latitude) {
            store.latitude = '';
        }

        const createdStore = new this.storeModel(store);
        return await createdStore.save();
    }

    async uploadedImage(id: ValidObjectIdDTO, image: any): Promise<Store> {
        if (!isValidObjectId(id)) {
            throw new NotFoundException(`Store with id ${id} not found !`);
        }

        return await this.storeModel.findByIdAndUpdate(id, { image: image.filename }, { new: true }).exec();
    }

    async findOne(id: ValidObjectIdDTO): Promise<Store> {
        if (!isValidObjectId(id)) {
            throw new NotFoundException(`Store with id ${id} not found !`);
        }
        const result = await this.storeModel.findById(id).exec();
        if (!result) {
            throw new NotFoundException(`Store with id ${id} not found !`);
        }
        return result;
    }

    async findStoresOfCategory(category_id: ValidObjectIdDTO): Promise<Store[]> {
        if (!isValidObjectId(category_id)) {
            throw new NotFoundException(`category with id ${category_id} hasn't any store yet!`);
        }

        const result = await this.storeModel.where({ 'store_category.id': category_id }).exec();

        if (!result) {
            throw new NotFoundException(`category with id ${category_id} hasn't any store yet!`);
        }
        return result;
    }

    async update(id: ValidObjectIdDTO, store: Store): Promise<Store> {
        if (!isValidObjectId(id)) {
            throw new NotFoundException(`Store with id ${id} not found !`);
        }

        return await this.storeModel.findByIdAndUpdate(id, store, { new: true }).exec();
    }

    async delete(id: ValidObjectIdDTO): Promise<any> {
        if (!isValidObjectId(id)) {
            throw new NotFoundException(`Store with id ${id} not found !`);
        }

        const store = await this.storeModel.findByIdAndDelete(id).exec();

        if (!store) {
            throw new NotFoundException(`Store with id ${id} not found !`);
        }
        return store;
    }

    // events
    async updateStoreCategoryData(newCategoryData: any): Promise<any> {
        const updateFields: Record<string, any> = {};

        if (newCategoryData.store_category.title !== undefined) {
            updateFields['store_category.title'] = newCategoryData.store_category.title;
        }

        if (newCategoryData.store_category.image !== undefined) {
            updateFields['store_category.image'] = newCategoryData.store_category.image;
        }

        await this.storeModel.updateMany({ 'store_category.store_category_id': newCategoryData.storeCategory_Id }, { $set: updateFields }, { new: true }).exec();
    }

    async updateHeadquarterData(newHeadquarter: any): Promise<any> {
        const updateFields: Record<string, any> = {};

        if (newHeadquarter.headquarter.title !== undefined) {
            updateFields['headquarter.title'] = newHeadquarter.headquarter.title;
        }

        if (newHeadquarter.headquarter.image !== undefined) {
            updateFields['headquarter.image'] = newHeadquarter.headquarter.image;
        }

        await this.storeModel.updateMany({ 'headquarter.headquarter_id': newHeadquarter.headquarter_Id }, { $set: updateFields }, { new: true }).exec();
    }

    async updateContactInfosData(newContactInfos: any): Promise<any> {
        const updateFields: Record<string, any> = {};
        
        if (newContactInfos.contact_infos.adress !== undefined) {
            updateFields['contact_infos.adress'] = newContactInfos.contact_infos.adress;
        }

        if (newContactInfos.contact_infos.tel !== undefined) {
            updateFields['contact_infos.tel'] = newContactInfos.contact_infos.tel;
        }

        await this.storeModel.updateMany({ 'contact_infos.contact_infos_id': newContactInfos.contact_infos_Id }, { $set: updateFields }, { new: true }).exec();
    }
}
