import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
  } from 'typeorm';
  import { IsNotEmpty } from 'class-validator';
  import { HeadquarterInterface } from './headquarter.interface';
  
  @Entity()
  export class Headquarter implements HeadquarterInterface {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string
    
    @Column()
    longitude: string;
  
    @Column()
    latitude: string;

    @IsNotEmpty()
    @Column()
    image1: string;
  
    @Column()
    image2: string;

    @Column()
    image3: string;

    @Column()
    city: string;
  
    @CreateDateColumn()
    createdAt: Date;
  }
  