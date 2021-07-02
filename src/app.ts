import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import "./database/index"
import { router } from "./routes";
import { AppError } from "./error/AppError";

const app = express();

app.use(express.json());

app.use(router)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({message: error.message});
  }

  return response.status(500).json({
    status: "Error internal",
    message: `Error server ${error.message}`
  });
  
});

export { app }