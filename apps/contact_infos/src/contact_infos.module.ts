import { Module } from '@nestjs/common';
import { ContactInfosController } from './contact_infos.controller';
import { ContactInfosService } from './contact_infos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact_infos } from './contact_infos.entity';
import { Contact_infosRMQService } from './contact_infos.rmq.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Contact_infos]),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'contact_infos-service',
            entities: [Contact_infos],
            synchronize: true,
        }),
    ],
    controllers: [ContactInfosController],
    providers: [ContactInfosService, Contact_infosRMQService],
})
export class ContactInfosModule {}
