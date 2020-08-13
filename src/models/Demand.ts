import { Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany, ManyToOne } from "typeorm"
import { Status } from "./Status";
import { UserToDemand } from "./UserToDemand";

@Entity()
export class Demand {

  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  date: Date

  @ManyToOne(type => Status, status => status.demands)
  status: Status

  @OneToMany(type => UserToDemand, userToDemand => userToDemand.demand)
  userToDemand!: UserToDemand[];
}
