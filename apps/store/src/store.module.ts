import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreSchema } from './store.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Store', schema: StoreSchema }]),
    MongooseModule.forRoot('mongodb://localhost:27017/store-service', {
      useUnifiedTopology: true,
    } as import("mongoose").ConnectOptions),
  ],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
