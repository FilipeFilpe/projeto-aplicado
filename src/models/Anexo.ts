import { Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany, ManyToOne } from "typeorm"
import { Demand } from "./Demand";

@Entity()
export class Anexo {

  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  name: string

  @Column()
  size: number

  @Column()
  key: string

  @Column()
  url: string

  @ManyToOne(type => Demand, demand => demand.anexos)
  demand: Demand
}
