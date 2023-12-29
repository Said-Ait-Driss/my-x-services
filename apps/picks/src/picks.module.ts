import { Module } from '@nestjs/common';
import { PicksController } from './picks.controller';
import { PicksService } from './picks.service';
import { PicksSchema } from './picks.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Picks', schema: PicksSchema }]),
  MongooseModule.forRoot('mongodb://localhost:27017/picks-service', {
    useUnifiedTopology: true,
  } as import("mongoose").ConnectOptions),],
  controllers: [PicksController],
  providers: [PicksService],
})
export class PicksModule {}
