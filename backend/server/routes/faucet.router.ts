import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.util";

export function faucetRouter(nextApp: any) {
	const router = Router();

	router.post(
		"/",
		asyncHandler(async (req, res) => {
			// implement faucet logic
			res.status(501).json({ error: "Not Implemented" });
		}),
	);

	return router;
}
