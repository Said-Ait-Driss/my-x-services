import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Orders_deliveryInterface } from './orders_delivery.interface';
import { ObjectId } from 'typeorm';

export class CreateOrders_deliveryDTO implements Orders_deliveryInterface {
  @IsNotEmpty()
  @IsString()
  readonly order_id: string;

  @IsNotEmpty()
  @IsString()
  readonly deliverer_id: string;

  @IsNotEmpty()
  @IsString()
  readonly client_id: string;

  @IsNotEmpty()
  @IsString()
  readonly store_id: string;

  @IsNotEmpty()
  @IsString()
  readonly adresse_to_delivery: string;

  readonly delivery_date: string;
}

export class ValidObjectIdDTO {
  id: ObjectId;
}
