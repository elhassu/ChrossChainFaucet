import { ICosmosAddressModel } from "@/server/interfaces/ICosmosAddress";
import { Schema, model } from "mongoose";

const CosmosAddressSchema = new Schema<ICosmosAddressModel>(
	{
		address: {
			type: String,
			required: true,
            unique: true,
		},
	},
	{ timestamps: true },
);

CosmosAddressSchema.index({ address: 1 });

export default model<ICosmosAddressModel>("CosmosAddress", CosmosAddressSchema);
