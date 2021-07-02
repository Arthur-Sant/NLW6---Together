import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { TagsRepository } from "../repositories/TagsRepository"

class ListTagsService {
  async execute(): Promise<Record<string, any>> {
    const tagsRepository = getCustomRepository(TagsRepository);

    let tags = await tagsRepository.find();


    return classToPlain(tags);
  }
}

export { ListTagsService } 