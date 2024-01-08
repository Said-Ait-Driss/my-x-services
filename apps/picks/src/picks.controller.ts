import { Controller, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PicksService } from './picks.service';
import { Picks } from './picks.schema';
import { Param } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { CreatePicksDTO ,UploadImageDTO ,ValidObjectIdDTO } from './picks.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { NotFoundException } from '@nestjs/common';
import { MessagePattern, Ctx, RmqContext, Payload } from '@nestjs/microservices';

const uploadFolder = path.join('./',__dirname, 'uploads');


@Controller()
export class PicksController {
  constructor(private readonly picksService: PicksService) {}

  @Get()
  getHello(): string {
    return this.picksService.getHello();
  }

  @Post("create")
  create( @Body() picks: CreatePicksDTO ): Promise<Picks> {
    return this.picksService.create(picks);
  }


  @Put('upload-image/:picks_id')
  @UseInterceptors(
      FileInterceptor('image', {
          storage: diskStorage({
              destination: uploadFolder,
              filename(req, file, callback) {
                  callback(null, `${new Date().getTime()}-${file.originalname}`);
              },
          }),
      }),
  )
  uploadImage(@Param('picks_id') picks_id: ValidObjectIdDTO, @UploadedFile() image: UploadImageDTO) {
      if (!image) throw new NotFoundException('image is required !');

      return this.picksService.uploadedImage(picks_id, image);
  }


  @Get(":id")
  findOne(@Param("id") id: ValidObjectIdDTO ): Promise<Picks> {
    return this.picksService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: ValidObjectIdDTO, @Body() picks: Picks): Promise<Picks> {
    return this.picksService.update(id,picks);
  }

  @Delete(":id")
  delete(@Param("id") id: ValidObjectIdDTO ): Promise<Picks> {
    return this.picksService.delete(id);
  }

  // events

  @MessagePattern('STORE_UPDATED')
  update_store_category(@Payload() data: any, @Ctx() context: RmqContext) {

        let newStoreData = JSON.parse(data)
        
        console.log("newStoreData ",newStoreData); 

        this.picksService.updateStoreData(newStoreData)

        console.log(`Pattern: ${context.getPattern()}`);
    }

    @MessagePattern("OFFER_UPDATED")
    update_current_offer(@Payload() data: any, @Ctx() context: RmqContext){
      let newCurrentOffer = JSON.parse(data)

      console.log("new offer : ",newCurrentOffer);
      
      this.picksService.updateOfferData(newCurrentOffer)

      console.log(`Pattern: ${context.getPattern()}`);

    }
}
