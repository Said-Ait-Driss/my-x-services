import { IsEmail, IsNotEmpty, Min } from 'class-validator';
import { UserInterface } from './user.interface';

export default class UserDto implements UserInterface {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @Min(8)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    headquarter_id: number;
    contact_info_id: number;

    type: string;
}

export class UpdateUserDTO {
    username: string;

    email: string;

    headquarter_id: number;
    contact_info_id: number;

    type: string;
}
