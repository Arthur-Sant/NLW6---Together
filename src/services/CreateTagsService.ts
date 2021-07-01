import { getCustomRepository } from "typeorm"
import { AppError } from "../error/AppError";
import { TagsRepository } from "../repositories/TagsRepository";

class CreateTagsService {
  async execute(name: string): Promise<Object>{
    const tagsRepository = getCustomRepository(TagsRepository);

    if(!name){
      throw new AppError("Incorrect name!");
    }

    const tagAlreadyExists = await tagsRepository.findOne({name});

    if(tagAlreadyExists) {
      throw new AppError("Tag already exists!");
    }

    const tag = tagsRepository.create({name});

    await tagsRepository.save(tag);

    return tag;
  }
}

export { CreateTagsService }