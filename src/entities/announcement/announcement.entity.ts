import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { ImgCover } from "../imgCover/imgCover.entity";
import { Gallery } from "../gallery/gallery.entity";
import { User } from "../user/user.entity";
import { Comments } from "../comments/comments.entity";

@Entity("announcement")
export class Announcement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50, type: "varchar" })
  mark: string;

  @Column({ length: 50, type: "varchar" })
  model: string;

  @Column({ type: "varchar" })
  year: string;

  @Column({ type: "varchar" })
  mileage: string;

  @Column({ type: "varchar" })
  color: string;

  @Column({ type: "varchar" })
  priceFipe: string;

  @Column({ type: "varchar" })
  price: string;

  @Column({ type: "varchar" })
  fuel: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @OneToOne(() => ImgCover, (imgcover) => imgcover.announcement, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  imgCover: ImgCover;

  @OneToMany(() => Gallery, (gallery) => gallery.announcement)
  gallery: Gallery[];

  @ManyToOne(() => User, (user) => user.announcement, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => Comments, (comments) => comments.announcements)
  comments: Comments[];
}
