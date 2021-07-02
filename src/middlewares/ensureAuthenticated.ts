import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";
import { AppError } from "../error/AppError";

interface IPayLoad {
  sub: string;
}

export function ensureAuthenticated(
   request: Request,
   response: Response, 
   next: NextFunction
) {

  const authToken = request.headers.authorization;
  
  if(!authToken) {
    throw new AppError("Token missing", 401);
  }

  const [, token ] = authToken.split(" ");

  try{
  const { sub } = verify(token, "af5b896425d3c69e4eff11485ed45523") as IPayLoad;

  request.user_id = sub;

  return next();  

  }catch(e){
    throw new AppError(e, 401);
  }
}