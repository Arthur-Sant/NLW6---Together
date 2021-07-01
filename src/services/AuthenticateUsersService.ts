import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm"
import { AppError } from "../error/AppError";
import { UsersRepository } from "../repositories/UsersRepository"

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUsersService {
  async execute({email, password}: IAuthenticateRequest): Promise<string> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ email });

    if(!user){
      throw new AppError("Email/Password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new AppError("Email/Password incorrect");
    }

    const token = sign(
      { email: user.email },
      "af5b896425d3c69e4eff11485ed45523",
      { subject: user.id, expiresIn: "1d"}
    );

    return token;
  }
}

export { AuthenticateUsersService }