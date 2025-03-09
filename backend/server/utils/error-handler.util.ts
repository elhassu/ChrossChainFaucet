import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { isErrorToCatch } from "../interfaces/rest/IResponse";

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
