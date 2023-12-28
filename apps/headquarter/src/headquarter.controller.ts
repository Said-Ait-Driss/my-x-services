import { Controller, Get ,  Body, Post, Param} from '@nestjs/common';
import { HeadquarterService } from './headquarter.service';
import { Headquarter } from './headquarter.entity';
import { CreateHeadquarterDTO } from './headquarter.dto';

@Controller()
export class HeadquarterController {
  constructor(private readonly headquarterService: HeadquarterService) {}

  @Get()
  getHello(): string {
    return this.headquarterService.getHello();
  }
  @Get(':id')
  async getHeadquarter(@Param() data : {id:string}): Promise<Headquarter> {
    return this.headquarterService.findOne({ id: data.id });
  }


  @Post('create')
  async create(@Body() data: CreateHeadquarterDTO ): Promise<any> {
    return this.headquarterService.create(data)
  }
}
