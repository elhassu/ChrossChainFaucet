import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { IErrorToBeCaught } from "../interfaces/rest/IResponse";

export function isErrorToCatch(err: any): IErrorToBeCaught | any {
	if (err.statusCode && err.message) {
	  return err as IErrorToBeCaught;
	} else {
		return false;
	};
  }

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	if (isErrorToCatch(err)) {
		res.status(err.statusCode).json({
			message: err.message,
		});
	} else {
		console.error("Failed with status code 500:");
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
}
