import { IsDecimal, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { HeadquarterInterface } from "./headquarter.interface";

export class CreateHeadquarterDTO implements HeadquarterInterface {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    image1: string;

    @IsNotEmpty()
    @IsString()
    city: string;
} 


export class UpdateHeadquarterDTO implements HeadquarterInterface{
    @IsString()
    title: string;

    image1: string;

    city: string;
}


export class UpdateHeadquarterIDDTO {
    @IsNotEmpty()
    @IsDecimal()
    id: number
}