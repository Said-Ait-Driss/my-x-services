import { IsDateString, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { ClientInterface, HeadquarterInterface, OrdersInterface } from './orders.interface';
import { ObjectId } from 'typeorm';
import { Type } from 'class-transformer';

class CreateClientDTO implements ClientInterface {
    @IsNotEmpty()
    @IsString()
    client_id: string;

    @IsNotEmpty()
    @IsString()
    username: string;
}

class CreateHeadquarterDTO implements HeadquarterInterface {
    @IsNotEmpty()
    @IsString()
    headquarter_id: string;

    @IsNotEmpty()
    @IsString()
    title: string;
}

export class CreateOrdersDTO implements OrdersInterface {
    @IsDateString()
    readonly order_date: string = new Date().toISOString();

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateClientDTO)
    readonly client: ClientInterface;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateHeadquarterDTO)
    readonly headquarter: HeadquarterInterface;

    status: string; // pending, proccessing, completed

    @IsNumber()
    picks_count: number = 1;
}

export class ValidObjectIdDTO {
    id: ObjectId;
}
