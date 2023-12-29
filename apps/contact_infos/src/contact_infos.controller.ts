import { Controller, Get ,  Body, Post, Param} from '@nestjs/common';
import { ContactInfosService } from './contact_infos.service';
import { Contact_infos } from './contact_infos.entity';
import { CreateContact_infosDTO } from './contact_infos.dto';

@Controller()
export class ContactInfosController {
  constructor(private readonly contactInfosService: ContactInfosService) {}

  @Get()
  getHello(): string {
    return this.contactInfosService.getHello();
  }

  @Get(':id')
  async getHeadquarter(@Param() data : {id:string}): Promise<Contact_infos> {
    return this.contactInfosService.findOne({ id: data.id });
  }


  @Post('create')
  async create(@Body() data: CreateContact_infosDTO ): Promise<any> {
    return this.contactInfosService.create(data)
  }

}
