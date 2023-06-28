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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  comments: string;

  @CreateDateColumn()
  createdAt: string | Date;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Announcement, (announcements) => announcements.comments)
  announcements: Announcement;
}
