import { Module } from '@nestjs/common';
import { StoreCategoriesController } from './store_categories.controller';
import { StoreCategoriesService } from './store_categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Store_categoriesSchema } from './store_categries.schema';
import { StoreRMQCategoriesService } from './store_categories.rmq.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Store_categories', schema: Store_categoriesSchema }]),
        MongooseModule.forRoot('mongodb://localhost:27017/Store_categories-service', {
            useUnifiedTopology: true,
        } as import('mongoose').ConnectOptions),
    ],
    controllers: [StoreCategoriesController],
    providers: [StoreCategoriesService, StoreRMQCategoriesService],
})
export class StoreCategoriesModule {}
