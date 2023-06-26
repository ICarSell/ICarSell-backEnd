import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "../address/address.entity";
import { hashSync } from "bcryptjs";
import { Announcement } from "../announcement/announcement.entity";
import { Comments } from "../comments/comments.entity";

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

  @Column({ type: "varchar", nullable: true })
  resetToken: string | null;

  @Column({ type: "date", nullable: true })
  resetTokenExpiration: Date | null;

  @OneToOne(() => Address, (address) => address.user, { onDelete: "CASCADE" })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Announcement, (announcement) => announcement.user, {
    onDelete: "CASCADE",
  })
  announcement: Announcement[];

  @BeforeInsert()
  hashPass() {
    this.password = hashSync(this.password, 9);
  }

  @OneToMany(() => Comments, (comments) => comments.user)
  comments: Comments[];
}
