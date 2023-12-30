import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository, InsertResult } from 'typeorm';
import { Contact_infos } from './contact_infos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContact_infosDTO, UpdateContact_infosDTO } from './contact_infos.dto';
import { Contact_infosRMQService } from './contact_infos.rmq.service';

@Injectable()
export class ContactInfosService {
    constructor(
        @InjectRepository(Contact_infos)
        private readonly contact_infosRepository: Repository<Contact_infos>,
        private contact_infosRMQService: Contact_infosRMQService,
    ) {}

    getHello(): string {
        return 'Hello from contact infos service !';
    }

    async findOne(query: any): Promise<Contact_infos> {
        const result = await this.contact_infosRepository
            .createQueryBuilder('contact_infos')
            .where(query) // Apply the query conditions
            .getOne();

        if (!result) {
            throw new NotFoundException(`contact infos with this id not found `);
        }
        return result;
    }

    async create(contact_infos: CreateContact_infosDTO): Promise<InsertResult> {
        const contact_infosEntity = this.contact_infosRepository.create(contact_infos);

        const res = await this.contact_infosRepository.insert(contact_infosEntity);

        Logger.log('create contact_infos - Created contact_infos');

        return res;
    }

    async update(id: number, contact_infos: UpdateContact_infosDTO): Promise<any> {
        let existingContactInfos = await this.contact_infosRepository.findOne({ where: { id: id } });
        if (!existingContactInfos) {
            throw new NotFoundException(`contact infos with id ${id} not found `);
        }

        Object.assign(existingContactInfos, contact_infos);

        const updatedStore = await this.contact_infosRepository.save(existingContactInfos);

        let data = {
            contact_infos: {
                ...contact_infos,
            },
            contact_infos_Id: id,
        };
        this.contact_infosRMQService.sendMessage('STORE_CONTACT_INFOS_UPDATED', JSON.stringify(data));

        return updatedStore;
    }
}
