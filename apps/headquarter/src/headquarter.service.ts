import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateHeadquarterDTO, UpdateHeadquarterIDDTO } from './headquarter.dto';
import { Headquarter } from './headquarter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { HeadquarterRMQService } from './headquarter.rmq.service';

@Injectable()
export class HeadquarterService {
    constructor(
        @InjectRepository(Headquarter)
        private readonly headquarterRepository: Repository<Headquarter>,
        private headquarterRMQService: HeadquarterRMQService,
    ) {}

    getHello(): string {
        return 'Hello from headquarter service !';
    }

    async findOne(query: any): Promise<Headquarter> {
        const result = await this.headquarterRepository
            .createQueryBuilder('headquarter')
            .where(query) // Apply the query conditions
            .getOne();

        if (!result) {
            throw new NotFoundException(`contact infos with this id not found `);
        }
        return result;
    }

    async create(headquarter: CreateHeadquarterDTO): Promise<InsertResult> {
        const headquarterEntity = this.headquarterRepository.create(headquarter);

        const res = await this.headquarterRepository.insert(headquarterEntity);

        return res;
    }

    async update(id: number, headquarter: CreateHeadquarterDTO): Promise<Headquarter> {

        let existingHeadquarter = await this.headquarterRepository.findOne({ where: { id: id } });

        if (!existingHeadquarter) {
            throw new NotFoundException(`headquarter with id ${id} not found `);
        }

        Object.assign(existingHeadquarter, headquarter);

        const updatedStore = await this.headquarterRepository.save(existingHeadquarter);

        let data = {
            headquarter: {
                ...headquarter,
            },
            headquarter_Id: id,
        };
        this.headquarterRMQService.sendMessage('HEADQUARTER_UPDATED', JSON.stringify(data));

        return updatedStore;
    }
}
