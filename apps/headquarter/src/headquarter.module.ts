import { Module } from '@nestjs/common';
import { HeadquarterController } from './headquarter.controller';
import { HeadquarterService } from './headquarter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Headquarter } from './headquarter.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [TypeOrmModule.forFeature([Headquarter]),    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'headquarter-service',
    entities: [Headquarter],
    synchronize: true,
  }),],
  controllers: [HeadquarterController],
  providers: [HeadquarterService],
})
export class HeadquarterModule {}
