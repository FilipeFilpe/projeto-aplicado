import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Area } from "./Area";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @ManyToOne(type => Area, area => area.users)
    area: Area

}
