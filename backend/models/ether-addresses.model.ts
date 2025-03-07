import { Schema, model, Document } from "mongoose";
import { IEtherAddressModel } from "@/interfaces/IEtherAddress";

const EtherAddressSchema = new Schema<IEtherAddressModel>(
	{
		address: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true },
);

export default model<IEtherAddressModel>("EtherAddress", EtherAddressSchema);
