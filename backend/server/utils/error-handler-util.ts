import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { IErrorToBeCaught } from "../interfaces/rest/IResponse";

export function isErrorToCatch(err: any): IErrorToBeCaught | Error {
	if (err.statusCode && err.message) {
	  return err as IErrorToBeCaught;
	} else return err as Error;
  }

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	if (isErrorToCatch(err)) {
		res.status(err.statusCode).json({
			message: err.message,
		});
	} else {
		res.status(err.statusCode || 500).json({
			message: "Internal Server Error",
		});
	}
}
