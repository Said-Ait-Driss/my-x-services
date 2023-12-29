import {  IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Picks_orderInterface } from "./picks_order.interface";
import { ObjectId } from "typeorm";

export class CreatePicks_orderDTO implements Picks_orderInterface{

    @IsNotEmpty()
    @IsString()
    readonly picks_id: string;

    @IsNotEmpty()
    @IsString()
    readonly order_id: string;
    
    @IsNotEmpty()
    @IsNumber()
    readonly picks_quantity: number;

} 

export class ValidObjectIdDTO {
    id: ObjectId
}