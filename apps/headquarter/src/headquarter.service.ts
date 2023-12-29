import { Injectable , Logger, NotFoundException } from '@nestjs/common';
import { CreateHeadquarterDTO } from './headquarter.dto';
import { Headquarter } from './headquarter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';


@Injectable()
export class HeadquarterService {

  constructor(
    @InjectRepository(Headquarter) 
    private readonly headquarterRepository: Repository<Headquarter>
    ){}

  getHello(): string {
    return 'Hello from headquarter service !';
  }

  async findOne(query: any): Promise<Headquarter> {
    const result = await this.headquarterRepository
      .createQueryBuilder('headquarter')
      .where(query) // Apply the query conditions
      .getOne();


      if(!result){
        throw new NotFoundException(`contact infos with this id not found `);
      }
        return result
  }



  async create(headquarter:CreateHeadquarterDTO): Promise<InsertResult> {

      const headquarterEntity = this.headquarterRepository.create(headquarter);

      const res = await this.headquarterRepository.insert(headquarterEntity);

      Logger.log('create headquarter - Created headquarter');

      return res;
  }
}
