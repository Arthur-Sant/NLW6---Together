import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

class ListUsersService{
  async execute(): Promise<Record<string, any>> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return classToPlain(users);
  }
}

export { ListUsersService }