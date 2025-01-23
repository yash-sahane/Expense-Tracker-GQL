import { NextFunction, Request, Response } from "express";

class ErrorHandler extends Error {
  status: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.status = statusCode;
    Object.setPrototypeOf(this, new.target.prototype); // Ensures proper prototype chain
    Error.captureStackTrace(this);
  }
}

// Express error-handling middleware function
export const errMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  return res.status(status).json({
    success: false,
    message: message,
  });
};

export default ErrorHandler;
