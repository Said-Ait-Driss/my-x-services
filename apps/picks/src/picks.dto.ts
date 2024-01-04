import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CurrentOffer, PicksInterface, Store } from './picks.interface';
import { IsImage } from './image-validators';
import { ObjectId } from 'typeorm';
import { Type } from 'class-transformer';

class CreateStoreDTO implements Store {
    @IsNotEmpty()
    @IsString()
    store_id: string;

    @IsNotEmpty()
    @IsString()
    title: string;
}

class CreateCurrentOfferDTO implements CurrentOffer {
    @IsNotEmpty()
    @IsString()
    offer_id: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    discount: number;
}

export class CreatePicksDTO implements PicksInterface {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly brand: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateStoreDTO)
    readonly store: Store;

    image: null | string;

    @IsNotEmpty()
    @IsNumber()
    original_price: number;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateCurrentOfferDTO)
    current_offer: CurrentOffer;
}

export class UploadImageDTO {
    @IsNotEmpty()
    @IsImage()
    image: Express.Multer.File | string;
}

export class ValidObjectIdDTO {
    id: ObjectId;
}
