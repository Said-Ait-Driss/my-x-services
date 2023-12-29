import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OrdersInterface } from './orders.interface';
import { ObjectId } from 'typeorm';

export class CreateOrdersDTO implements OrdersInterface {
  @IsNotEmpty()
  @IsDateString()
  readonly order_date: string;

  @IsNotEmpty()
  readonly client_id: string;

  @IsNotEmpty()
  readonly headquarter_id: string;

  @IsNotEmpty()
  status: string // pending, proccessing, completed
}

export class ValidObjectIdDTO {
  id: ObjectId;
}
