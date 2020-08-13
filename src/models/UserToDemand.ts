import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Paper } from "./Paper";
import { User } from "./User";
import { Demand } from "./Demand";

@Entity()
export class UserToDemand {
  @PrimaryGeneratedColumn()
  userToDemandID: number;

  @Column()
  userId: number;

  @Column()
  demandId: number;

  @ManyToOne(type => Paper, paper => paper.userToDemand)
  paper: Paper;

  @ManyToOne(type => User, user => user.userToDemand)
  user: User;

  @ManyToOne(type => Demand, demand => demand.userToDemand)
  demand: Demand;
}