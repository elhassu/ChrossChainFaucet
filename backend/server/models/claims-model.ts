import { IClaimModel } from "@/server/interfaces/IClaims";
import { Schema, model } from "mongoose";

const ClaimSchema = new Schema<IClaimModel>(
	{
		cosmosAddress: {
			type: String,
			required: true,
		},
		etherAddress: {
			type: String,
			required: true,
		},
		transactionHash: {
			type: String,
		},
	},
	{ timestamps: true },
);

ClaimSchema.index({ cosmosAddress: 1, createdAt: 1 });

export default model<IClaimModel>("Claims", ClaimSchema);
