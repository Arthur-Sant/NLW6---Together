import { getCustomRepository } from "typeorm";
import { AppError } from "../error/AppError";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUSerRequest {
  name: string;
  email: string;
  admin?: boolean
}

class CreateUsersService {
  async execute({name, email, admin}: IUSerRequest): Promise<Object> {
    const usersRepository = getCustomRepository(UsersRepository);

    if(!email) {
      throw new AppError("Email incorrect");
    }

    const userAlreadyExists = await usersRepository.findOne({email});

    if(userAlreadyExists){
      throw new AppError("User already exists");
    };

    const user = usersRepository.create({
      name,
      email,
      admin
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUsersService }