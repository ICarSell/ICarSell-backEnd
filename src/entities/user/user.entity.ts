import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 30, type: "varchar" })
  name: string;

  @Column({ length: 100, type: "varchar", unique: true })
  email: string;

  @Column({ length: 120, type: "varchar" })
  password: string;

  @Column({ length: 14, type: "varchar", unique: true })
  cpf: string;

  @Column({ length: 13, type: "varchar" })
  phone: string;

  @Column({ type: "integer" })
  dateOfBirth: number;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "boolean", default: false })
  isSeller: boolean;
}
