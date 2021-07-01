import { Request, Response } from "express";
import { CreateUsersService } from "../services/CreateUsersService";

class CreateUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {name, email, admin} = request.body;

    const usersService = new CreateUsersService();

    const user = await usersService.execute({name, email, admin});

    return response.json(user);
  }
}

export { CreateUsersController }