import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { Announcement } from "../announcement/announcement.entity";

@Entity("comments")
export class Comments {
  remove() {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  comments: string;

  @CreateDateColumn()
  createdAt: string | Date;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Announcement, (announcements) => announcements.comments, {
    onDelete: "CASCADE",
  })
  announcements: Announcement;
}
