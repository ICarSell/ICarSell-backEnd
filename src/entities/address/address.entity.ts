import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ length: 10, type: "varchar" })
  complement: string;
}

// PENDENCIA: FAZER A RELAÇÃO 1:1 COM USERS, AGUARDANDO A CRIAÇÃO DA TABELA.
