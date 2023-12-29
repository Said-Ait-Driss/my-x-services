import {  IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PicksInterface } from "./picks.interface";
import { IsImage } from "./image-validators";
import { ObjectId } from "typeorm";

export class CreatePicksDTO implements PicksInterface{

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly brand: string;
    
    @IsNotEmpty()
    readonly store_id: string;

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