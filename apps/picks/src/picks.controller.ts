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

const uploadFolder = path.join('./',__dirname, 'uploads');


@Controller()
export class PicksController {
  constructor(private readonly picksService: PicksService) {}

  @Get()
  getHello(): string {
    return this.picksService.getHello();
  }

  @Post("create")
  @UseInterceptors(FileInterceptor('image', {storage:diskStorage({
    destination: uploadFolder,
    filename(req, file, callback) {
      callback(null,`${new Date().getTime()}-${file.originalname}`)
    },
  })}))
  create(@UploadedFile() image: UploadImageDTO, @Body() picks: CreatePicksDTO ): Promise<Picks> {
    if(!image)
      throw new NotFoundException("image is required !")
    return this.picksService.create(image,picks);
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

}
