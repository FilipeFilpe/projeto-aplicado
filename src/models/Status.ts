import { Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany, ManyToOne } from "typeorm"
import { Demand } from "./Demand";

@Entity()
export class Status {
  
  @PrimaryGeneratedColumn()
  id: number; 
  
  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(type => Status, status => status.demands)
  demands: Demand[]
}