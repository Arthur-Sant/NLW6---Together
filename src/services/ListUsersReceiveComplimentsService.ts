import { getCustomRepository } from "typeorm";
import { Compliment } from "../entities/Compliment";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";

class ListUsersReceiveComplimentsService {
  async execute(user_id: string): Promise<Compliment[]> {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const compliments = await complimentsRepository.find({
      where: { user_receiver: user_id },
      relations: ["userReceiver", "tag", "userSender"]
    });

    return compliments;
  }
}

export { ListUsersReceiveComplimentsService }