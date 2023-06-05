// Tarefas: 1- Adicionar typagem

import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";

export const deleteCarService = async (id: number) => {
  const carRepo: Repository<any> = AppDataSource.getRepository("car");

  await carRepo.delete({ id: id });
};
