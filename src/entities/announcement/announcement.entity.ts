import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { ImgCover } from "../imgCover/imgCover.entity";
import { Gallery } from "../gallery/gallery.entity";

@Entity("announcement")
export class Announcement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50, type: "varchar" })
  mark: string;

  @Column({ length: 50, type: "varchar" })
  model: string;

  @Column({ type: "integer" })
  year: number | string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  mileage: number | string;

  @Column({ type: "varchar" })
  color: string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  priceFipe: number | string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  price: number | string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @OneToOne(() => ImgCover)
  @JoinColumn()
  imgCover: any;

  @OneToMany(() => Gallery, (gallery) => gallery.announcement)
  gallery: Gallery[];
}
