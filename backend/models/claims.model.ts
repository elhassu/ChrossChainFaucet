import { IClaimModel } from "@/interfaces/IClaims";
import { Schema, model } from "mongoose";

const ClaimSchema = new Schema<IClaimModel>(
	{
		cosmosAddressId: {
			type: Schema.Types.ObjectId,
			ref: "CosmosAddress",
			required: true,
		},
		etherAddressId: {
			type: Schema.Types.ObjectId,
			ref: "EtherAddress",
			required: true,
		},
		claimTimestamp: {
			type: Date,
			default: Date.now,
		},
		transactionHash: {
			type: String,
		},
	},
	{ timestamps: true },
);

ClaimSchema.index({ cosmosAddressId: 1, claimTimestamp: 1 });

export default model<IClaimModel>("Claims", ClaimSchema);
