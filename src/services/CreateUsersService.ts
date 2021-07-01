import { getCustomRepository } from "typeorm";
import { AppError } from "../error/AppError";
import { UsersRepository } from "../repositories/UsersRepository";
import { hash } from "bcryptjs";
import { User } from "../entities/User";

interface IUSerRequest {
  name: string;
  email: string;
  admin?: boolean;
  password?: string;
}

class CreateUsersService {
  async execute({name, email, admin = false, password}: IUSerRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    if(!email) {
      throw new AppError("Email incorrect");
    }

    const userAlreadyExists = await usersRepository.findOne({email});

    if(userAlreadyExists){
      throw new AppError("User already exists");
    };

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUsersService }