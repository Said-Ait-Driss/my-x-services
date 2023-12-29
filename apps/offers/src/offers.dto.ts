import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OffersInterface } from './offers.interface';
import { ObjectId } from 'typeorm';

export class CreateOffersDTO implements OffersInterface {
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  readonly discount: number;

  @IsNotEmpty()
  @IsDateString()
  readonly start_date: string;

  @IsNotEmpty()
  @IsDateString()
  readonly end_date: string;

  @IsNotEmpty()
  readonly picks_id: string;
}

export class ValidObjectIdDTO {
  id: ObjectId;
}
