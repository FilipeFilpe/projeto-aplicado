import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Generated, BeforeInsert } from "typeorm"
import bcrypt from "bcrypt"
import { Area } from "./Area"

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

}
