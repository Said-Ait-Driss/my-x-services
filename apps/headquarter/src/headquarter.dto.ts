import { IsEmail, IsNotEmpty, IsString, Min } from "class-validator";
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