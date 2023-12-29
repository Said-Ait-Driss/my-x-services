import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository, InsertResult } from 'typeorm';
import { Contact_infos } from './contact_infos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContact_infosDTO } from './contact_infos.dto';

@Injectable()
export class ContactInfosService {

  constructor(
    @InjectRepository(Contact_infos) 
    private readonly contact_infosRepository: Repository<Contact_infos>
    ){}


  getHello(): string {
    return 'Hello World!';
  }


  async findOne(query: any): Promise<Contact_infos> {
    const result =  await this.contact_infosRepository
      .createQueryBuilder('contact_infos')
      .where(query) // Apply the query conditions
      .getOne();

    if(!result){
      throw new NotFoundException(`contact infos with this id not found `);
    }
      return result
  }



  async create(contact_infos:CreateContact_infosDTO): Promise<InsertResult> {

      const contact_infosEntity = this.contact_infosRepository.create(contact_infos);

      const res = await this.contact_infosRepository.insert(contact_infosEntity);

      Logger.log('create contact_infos - Created contact_infos');

      return res;
  }


}
