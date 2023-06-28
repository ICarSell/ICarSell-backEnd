import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user/user.entity";

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 10, type: "varchar" })
  zipCode: string;

  @Column({ length: 50, type: "varchar" })
  state: string;

  @Column({ length: 50, type: "varchar" })
  city: string;

  @Column({ length: 50, type: "varchar" })
  street: string;

  @Column({ length: 10, type: "varchar" })
  number: string;

  @Column({ length: 100, type: "varchar" })
  complement: string;

  @OneToOne(() => User, (user) => user.address)
  @JoinColumn()
  user: User;
}
