import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/AppError";

export function ensureAdmin(
  request: Request, response: Response, next: NextFunction
  ): any {

  const admin = true;

  if(admin){
    return next();
  }

  throw new AppError("Unauthorized", 401);
}