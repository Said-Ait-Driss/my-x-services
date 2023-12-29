import { Module } from '@nestjs/common';
import { StoreCategoriesController } from './store_categories.controller';
import { StoreCategoriesService } from './store_categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Store_categoriesSchema } from './store_categries.schema';

@Module({
  imports: [ MongooseModule.forFeature([{ name: 'Store_categories', schema: Store_categoriesSchema }]),
  MongooseModule.forRoot('mongodb://localhost:27017/Store_categories-service', {
    useUnifiedTopology: true,
  } as import("mongoose").ConnectOptions),],
  controllers: [StoreCategoriesController],
  providers: [StoreCategoriesService],
})
export class StoreCategoriesModule {}
