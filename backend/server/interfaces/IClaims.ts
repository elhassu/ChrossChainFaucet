import { Document, Types } from "mongoose";

export interface IClaimModel extends Document {
	cosmosAddressId: Types.ObjectId; // reference to CosmosAddress
	etherAddressId: Types.ObjectId; // reference to EtherAddress
	claimTimestamp: Date;
	transactionHash: string;
}

export interface IClaim {
    _id: string;
    cosmosAddressId: string;
    etherAddressId: string;
    claimTimestamp: Date;
    transactionHash: string;
    createdAt: Date;
    updatedAt: Date;
}