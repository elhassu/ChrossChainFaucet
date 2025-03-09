import { Router } from "express";
import { asyncHandler } from "../utils/async-handler-util";
import { faucetController } from "../controllers/faucet-controller";

const router = Router();

router.post(
	"/",
	asyncHandler(faucetController),
);

export { router as faucetRouter };
