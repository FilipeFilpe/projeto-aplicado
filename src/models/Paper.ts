import { Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany, ManyToOne } from "typeorm"
import { UserToDemand } from "./UserToDemand";

@Entity()
export class Paper {
  
  @PrimaryGeneratedColumn()
  id: number; 
  
  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(type => UserToDemand, userToDemand => userToDemand.demand)
  userToDemand: UserToDemand[]
}