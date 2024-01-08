import { Controller, Get, Post, Param, Put, Delete, Body } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOffersDTO, ValidObjectIdDTO } from './offers.dto';
import { Offers } from './offers.schema';

@Controller()
export class OffersController {
    constructor(private readonly offersService: OffersService) {}

    @Get()
    getHello(): string {
        return this.offersService.getHello();
    }

    @Post('create')
    create(@Body() offers: CreateOffersDTO): Promise<Offers> {
        return this.offersService.create(offers);
    }

    @Get(':id')
    findOne(@Param('id') id: ValidObjectIdDTO): Promise<Offers> {
        return this.offersService.findOne(id);
    }

    @Get('latest/:pick_id')
    findLatest(@Param('pick_id') pick_id: ValidObjectIdDTO): Promise<Offers> {
        return this.offersService.getLatest(pick_id);
    }

    @Get('pick-offers/:pick_id')
    findPickOffers(@Param('pick_id') pick_id: ValidObjectIdDTO): Promise<Offers[]> {
        return this.offersService.getPickOffers(pick_id);
    }

    @Put(':id/:pick_id')
    update(@Param('id') id: ValidObjectIdDTO, @Param('pick_id') pick_id: ValidObjectIdDTO, @Body() offers: Offers): Promise<Offers> {
        return this.offersService.update(id, pick_id, offers);
    }

    @Delete(':id')
    delete(@Param('id') id: ValidObjectIdDTO): Promise<Offers> {
        return this.offersService.delete(id);
    }
}
