import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Store_categories } from './store_categries.schema';
import { Model } from 'mongoose';
import { isValidObjectId } from 'mongoose';
import { CreateStore_categoriesDTO, ValidObjectIdDTO } from './store_categories.dto';
import { myRabbitMqConfig } from 'utils/utils/constants';
import { StoreRMQCategoriesService } from './store_categories.rmq.service';

@Injectable()
export class StoreCategoriesService {
    constructor(
        @InjectModel('Store_categories') private readonly store_categoriesModel: Model<Store_categories>,
        private storeCategoriesRabbitMQService: StoreRMQCategoriesService,
    ) {}

    getHello(): string {
        return 'Hello from store categories service !';
    }

    async create(image: any, store_category: CreateStore_categoriesDTO): Promise<Store_categories> {
        store_category.image = image.filename;

        const createdStore = new this.store_categoriesModel(store_category);
        return await createdStore.save();
    }

    async findOne(id: ValidObjectIdDTO): Promise<Store_categories> {
        if (!isValidObjectId(id)) {
            throw new NotFoundException(`store category with id ${id} not found !`);
        }
        const result = await this.store_categoriesModel.findById(id).exec();
        if (!result) {
            throw new NotFoundException(`store category with id ${id} not found !`);
        }
        return result;
    }

    async update(id: ValidObjectIdDTO, store_category: Store_categories): Promise<Store_categories> {
        if (!isValidObjectId(id)) {
            throw new NotFoundException(`store category with id ${id} not found !`);
        }

        const result = await this.store_categoriesModel.findByIdAndUpdate(id, store_category, { new: true }).exec();
        if (result) {
            let data = {
                store_category:{
                    ...store_category,
                },
                storeCategory_Id: id,
            };
            this.storeCategoriesRabbitMQService.sendMessage('STORE_CATEGORY_UPDATED', JSON.stringify(data));
        }
        return result;
    }

    async delete(id: ValidObjectIdDTO): Promise<any> {
        if (!isValidObjectId(id)) {
            throw new NotFoundException(`store category with id ${id} not found !`);
        }

        const store = await this.store_categoriesModel.findByIdAndDelete(id).exec();

        if (!store) {
            throw new NotFoundException(`store category with id ${id} not found !`);
        }
        return store;
    }
}
