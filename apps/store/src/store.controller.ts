import { Controller, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StoreService } from './store.service';
import { Store } from './store.schema';
import { Param } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { CreateStoreDTO ,UploadImageDTO ,ValidObjectIdDTO} from './store.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { NotFoundException } from '@nestjs/common';

const uploadFolder = path.join('./',__dirname, 'uploads');

@Controller()
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  getHello(): string {
    return this.storeService.getHello();
  }


  @Post("create")
  @UseInterceptors(FileInterceptor('image', {storage:diskStorage({
    destination: uploadFolder,
    filename(req, file, callback) {
      callback(null,`${new Date().getTime()}-${file.originalname}`)
    },
  })}))
  create(@UploadedFile() image: UploadImageDTO, @Body() store: CreateStoreDTO ): Promise<Store> {
    if(!image)
      throw new NotFoundException("image is required !")
    return this.storeService.create(image,store);
  }

  @Get(":id")
  findOne(@Param("id") id: ValidObjectIdDTO ): Promise<Store> {
    return this.storeService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: ValidObjectIdDTO, @Body() store: Store): Promise<Store> {
    return this.storeService.update(id,store);
  }

  @Delete(":id")
  delete(@Param("id") id: ValidObjectIdDTO ): Promise<Store> {
    return this.storeService.delete(id);
  }
}
