import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Announcement } from "../index";

@Entity("gallery")
export class Gallery {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  fileName: string;

  @Column({ type: "text" })
  path: string;

  @ManyToOne(() => Announcement, (announcement) => announcement.gallery, {
    cascade: true,
    onDelete: "CASCADE",
  })
  announcement: any;
}
