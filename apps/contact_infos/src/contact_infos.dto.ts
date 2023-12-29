import { IsEmail, IsNotEmpty, IsString, Min } from "class-validator";
import { Contact_infosInterface } from "./contact_infos.interface";

export class CreateContact_infosDTO implements Contact_infosInterface {

    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    adress: string;

    @IsNotEmpty()
    @IsString()
    city: string;
} 