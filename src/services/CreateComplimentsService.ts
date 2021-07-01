import { getCustomRepository } from "typeorm";
import { Compliment } from "../entities/Compliment";
import { AppError } from "../error/AppError";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";
import { UsersRepository } from "../repositories/UsersRepository";

interface IComplimentRequest{
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentsService {
  async execute({
    tag_id,
    user_sender, 
    user_receiver, 
    message
  }: IComplimentRequest): Promise<Compliment> {

    const complimentsRepository = getCustomRepository(ComplimentsRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    if(user_receiver === user_sender){
      throw new AppError("Incorrect User Receiver");
    }

    const userReceiverExists = await usersRepository.findOne(user_receiver);

    if(!userReceiverExists) {
      throw new AppError("User receiver does not exist");
    }

    const compliment = complimentsRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    });

    await complimentsRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentsService }