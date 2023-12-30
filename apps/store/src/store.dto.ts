import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  CategoryInterface,
  ContactInfoInterface,
  StoreInterface,
} from './store.interface';
import { IsImage } from './image-validators';
import { ObjectId } from 'typeorm';
import { Type } from 'class-transformer';
import { HeadquarterInterface } from './store.interface';

class ContactInfoDto {
  @IsString()
  @IsNotEmpty()
  contact_infos_id: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  tel: string;
}

class CategoryDto {
  @IsString()
  @IsNotEmpty()
  store_category_id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}


class HeadquarterDto {
  @IsString()
  @IsNotEmpty()
  headquarter_id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}


export class CreateStoreDTO implements StoreInterface {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  longitude: string;
  latitude: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => HeadquarterDto)
  readonly headquarter: HeadquarterInterface;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ContactInfoDto)
  contact_infos: ContactInfoInterface;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CategoryDto)
  store_category: CategoryInterface;

  image: null | string;
}

export class UploadImageDTO {
  @IsNotEmpty()
  @IsImage()
  image: Express.Multer.File | string;
}

export class ValidObjectIdDTO {
  id: ObjectId;
}
