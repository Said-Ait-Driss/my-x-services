import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
  } from 'typeorm';
  import { Contact_infosInterface } from './contact_infos.interface';
  
  @Entity()
  export class Contact_infos implements Contact_infosInterface {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    first_name: string
    
    @Column()
    last_name: string;
  
    @Column()
    email: string;

    @Column()
    adress: string;
  
    @Column()
    city: string;

    @CreateDateColumn()
    createdAt: Date;
  }
  