import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { EntityManager } from 'typeorm';
import { hash, compareSync } from 'bcrypt';
import { UserRMQService } from './user.rmq.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly entityManager: EntityManager,
        private readonly userRMService: UserRMQService,
    ) {}

    findOne(query: any): Promise<User> {
        return this.userRepository
            .createQueryBuilder('user')
            .where(query) // Apply the query conditions
            .getOne();
    }

    async createUser(user: any): Promise<InsertResult> {
        try {
            const userEntity = this.userRepository.create(user);

            const res = await this.userRepository.insert(userEntity);

            Logger.log('createUser - Created user');

            return res;
        } catch (e) {
            Logger.log(e);
            throw e;
        }
    }

    async updateUser(id: number, user: Partial<User | any>): Promise<User | any> {
        let foundUser = await this.entityManager.findOne(User, { where: { id } });

        if (!foundUser) {
            return new NotFoundException({ message: `user with id ${id} not found` });
        }

        if (user.password) {
            if (!('old_password' in user)) {
                return new NotFoundException({ message: 'old password not provided !' });
            }
            if (!('confirm_password' in user)) {
                return new NotFoundException({ message: 'confirm password not provided !' });
            }
            if (user.password != user.confirm_password) {
                return new NotFoundException({ message: 'confirm password with password not matched !' });
            }

            if (!compareSync(user.old_password, foundUser?.password)) {
                return new NotFoundException({ message: 'old password inccorect !' });
            }
            user.password = await hash(user.password, 10);
        }

        foundUser = Object.assign(foundUser, user);

        const saveResponse = await this.userRepository.save(foundUser);
        console.log(saveResponse);

        if (saveResponse && saveResponse.type == 'client') {
            let data = {
              client: {
                    username: saveResponse.username,
                    client_id: saveResponse.id,
                },
                client_id: saveResponse.id,
            };
            this.userRMService.sendMessage('CLIENT_INFOS_UPDATED', JSON.stringify(data));
        }
        return saveResponse;
    }
}
