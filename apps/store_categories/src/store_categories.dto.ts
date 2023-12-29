import {  IsNotEmpty, IsString } from "class-validator";
import { Store_categoriesInterface } from "./store_categories.interface";
import { IsImage } from "./image-validators";
import { ObjectId } from "typeorm";

export class CreateStore_categoriesDTO implements Store_categoriesInterface{

    @IsNotEmpty()
    @IsString()
    readonly title: string;
    
    image: null | string

} 

export class UploadImageDTO {
    @IsNotEmpty()
    @IsImage()
    image: Express.Multer.File | string;
}

export class ValidObjectIdDTO {
    id: ObjectId
}