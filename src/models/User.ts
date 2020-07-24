import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Area } from "./Area";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({nullable: false})
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;
  
  @Column({nullable: false})
  password: string;

  @ManyToOne(type => Area, area => area.users)
  area: Area

}
