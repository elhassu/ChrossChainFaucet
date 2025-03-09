import { IClaimModel } from "@/server/interfaces/IClaims";
import { Schema, model } from "mongoose";

const ClaimSchema = new Schema<IClaimModel>(
	{
		cosmosAddressId: {
			type: String,
			required: true,
		},
		etherAddressId: {
			type: String,
			required: true,
		},
		transactionHash: {
			type: String,
		},
	},
	{ timestamps: true },
);

ClaimSchema.index({ cosmosAddressId: 1, claimTimestamp: 1 });

export default model<IClaimModel>("Claims", ClaimSchema);
