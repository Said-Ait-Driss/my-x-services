import { Module } from '@nestjs/common';
import { HeadquarterController } from './headquarter.controller';
import { HeadquarterService } from './headquarter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Headquarter } from './headquarter.entity';
import { HeadquarterRMQService } from './headquarter.rmq.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Headquarter]),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'headquarter-service',
            entities: [Headquarter],
            synchronize: true,
        }),
    ],
    controllers: [HeadquarterController],
    providers: [HeadquarterService, HeadquarterRMQService],
})
export class HeadquarterModule {}
