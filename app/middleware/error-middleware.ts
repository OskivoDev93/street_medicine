import { NODE_ENV } from "../utils/config";
import { NextFunction, Response, Request } from "express";
import HttpException from "../utils/http-exception";

export const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong";

  res.status(status).json({
    message: message,
    stack: NODE_ENV == "production" ? null : err.stack,
  });
};
