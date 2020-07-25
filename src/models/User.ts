import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Generated } from "typeorm";
import { Area } from "./Area";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
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
