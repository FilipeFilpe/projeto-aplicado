import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Generated } from "typeorm";
import { User } from "./User";

@Entity()
export class Role {

  @PrimaryGeneratedColumn()
  id: number; 
  
  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(type => User, user => user.role)
  users: User[];
}
