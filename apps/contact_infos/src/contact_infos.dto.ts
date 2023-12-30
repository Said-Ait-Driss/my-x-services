import { IsDecimal, IsEmail, IsNotEmpty, IsString, Length, Max, Min, isNumberString } from 'class-validator';
import { Contact_infosInterface } from './contact_infos.interface';

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

    @IsNotEmpty()
    @IsString()
    @Length(10,10)
    tel: string;
}

export class UpdateContact_infosDTO implements Contact_infosInterface {
    first_name: string;
    last_name: string;
    email: string;
    adress: string;
    city: string;
    tel: string;
}

export class UpdateContact_infosIDDTO {
    @IsNotEmpty()
    @IsDecimal()
    id: number;
}
