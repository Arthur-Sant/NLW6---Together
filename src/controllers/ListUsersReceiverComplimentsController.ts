import { Request, Response } from "express";
import { ListUsersReceiveComplimentsService } from "../services/ListUsersReceiveComplimentsService";

class ListUsersReceiverComplimentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;

    const listUsersReceiverComplimentsService = new ListUsersReceiveComplimentsService();

    const compliment = await listUsersReceiverComplimentsService.execute(user_id);

    return response.json(compliment);
  }
}

export { ListUsersReceiverComplimentsController }