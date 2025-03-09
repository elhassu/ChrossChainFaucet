import { Document, Types } from "mongoose";

export interface IClaimModel extends Document {
    _id: string;
    cosmosAddressId: string;
    etherAddressId: string;
    transactionHash: string;
    createdAt: Date;
    updatedAt: Date;
}