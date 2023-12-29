import { Controller, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StoreCategoriesService } from './store_categories.service';
import { Param } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { CreateStore_categoriesDTO ,UploadImageDTO ,ValidObjectIdDTO} from './store_categories.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { NotFoundException } from '@nestjs/common';
import { Store_categories } from './store_categries.schema';

const uploadFolder = path.join('./',__dirname, 'uploads');

@Controller()
export class StoreCategoriesController {
  constructor(private readonly storeCategoriesService: StoreCategoriesService) {}

  @Get()
  getHello(): string {
    return this.storeCategoriesService.getHello();
  }

  @Post("create")
  @UseInterceptors(FileInterceptor('image', {storage:diskStorage({
    destination: uploadFolder,
    filename(req, file, callback) {
      callback(null,`${new Date().getTime()}-${file.originalname}`)
    },
  })}))
  create(@UploadedFile() image: UploadImageDTO, @Body() store_category: CreateStore_categoriesDTO ): Promise<Store_categories> {
    if(!image)
      throw new NotFoundException("image is required !")
    return this.storeCategoriesService.create(image,store_category);
  }

  @Get(":id")
  findOne(@Param("id") id: ValidObjectIdDTO ): Promise<Store_categories> {
    return this.storeCategoriesService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: ValidObjectIdDTO, @Body() store_category: Store_categories): Promise<Store_categories> {
    return this.storeCategoriesService.update(id,store_category);
  }

  @Delete(":id")
  delete(@Param("id") id: ValidObjectIdDTO ): Promise<Store_categories> {
    return this.storeCategoriesService.delete(id);
  }


}
