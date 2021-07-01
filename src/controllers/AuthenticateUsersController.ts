import { Request, Response } from "express";
import { AuthenticateUsersService } from "../services/AuthenticateUsersService";

class AuthenticateUsersController{
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUsersService = new AuthenticateUsersService();

    const token = await authenticateUsersService.execute({email, password});

    return response.json(token);
  }
}

export { AuthenticateUsersController }