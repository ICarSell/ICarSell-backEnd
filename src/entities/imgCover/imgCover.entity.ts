import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Announcement } from "../announcement/announcement.entity";

@Entity("imgCover")
export class ImgCover {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  fileName: string;

  @Column({ type: "text" })
  path: string;

  @OneToOne(() => Announcement, (announcement) => announcement.imgCover)
  announcement: Announcement;
}
