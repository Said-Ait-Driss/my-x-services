import {  IsNotEmpty, IsNumber, IsString } from "class-validator";
import { StoreInterface } from "./store.interface";
import { IsImage } from "./image-validators";
import { ObjectId } from "typeorm";

export class CreateStoreDTO implements StoreInterface{

    @IsNotEmpty()
    @IsString()
    readonly title: string;
    

    longitude: string;
    latitude: string;
    
    @IsNotEmpty()
    readonly headquarter_id: string;
    contact_info_id: string;

    @IsNotEmpty()
    @IsString()
    readonly store_category_id: string;

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