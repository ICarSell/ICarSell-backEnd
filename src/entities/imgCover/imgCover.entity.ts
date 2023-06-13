import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("imgCover")
export class ImgCover {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  fileName: string;

  @Column({ type: "text" })
  path: string;
}
