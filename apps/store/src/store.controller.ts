import { Controller, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StoreService } from './store.service';
import { Store } from './store.schema';
import { Param } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { CreateStoreDTO, UploadImageDTO, ValidObjectIdDTO } from './store.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { NotFoundException } from '@nestjs/common';
import { MessagePattern, Ctx, RmqContext, Payload } from '@nestjs/microservices';

const uploadFolder = path.join('./', __dirname, 'uploads');

@Controller()
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @Get()
    getHello(): string {
        return this.storeService.getHello();
    }

    @Post('create')
    create(@Body() store: CreateStoreDTO): Promise<Store> {
        return this.storeService.create(store);
    }

    @Put('upload-image/:store_id')
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
    uploadImage(@Param('store_id') store_id: ValidObjectIdDTO, @UploadedFile() image: UploadImageDTO) {
        if (!image) throw new NotFoundException('image is required !');

        return this.storeService.uploadedImage(store_id, image);
    }

    @Get(':id')
    findOne(@Param('id') id: ValidObjectIdDTO): Promise<Store> {
        return this.storeService.findOne(id);
    }

    @Get('stores-of-category/:category_id')
    findStoresOfCategory(@Param('category_id') category_id: ValidObjectIdDTO): Promise<Store[]> {
        return this.storeService.findStoresOfCategory(category_id);
    }

    @Put(':id')
    update(@Param('id') id: ValidObjectIdDTO, @Body() store: Store): Promise<Store> {
        return this.storeService.update(id, store);
    }

    @Delete(':id')
    delete(@Param('id') id: ValidObjectIdDTO): Promise<Store> {
        return this.storeService.delete(id);
    }

    // events

    @MessagePattern('STORE_CATEGORY_UPDATED')
    update_store_category(@Payload() data: any, @Ctx() context: RmqContext) {

        let newCategoryData = JSON.parse(data)
        console.log("newCategoryData ",newCategoryData);        
        this.storeService.updateStoreCategoryData(newCategoryData)

        console.log(`Pattern: ${context.getPattern()}`);
    }

    @MessagePattern('HEADQUARTER_UPDATED')
    update_headquarter(@Payload() data:any,@Ctx() context:RmqContext){
        let newHeadquarter = JSON.parse(data)
        this.storeService.updateHeadquarterData(newHeadquarter)
    }

    @MessagePattern('STORE_CONTACT_INFOS_UPDATED')
    update_contact_infos(@Payload() data:any,@Ctx() context:RmqContext){
        let newContactInfos = JSON.parse(data)

        console.log("STORE_CONTACT_INFOS_UPDATED : ",data);
        
        this.storeService.updateContactInfosData(newContactInfos)
    }
}
