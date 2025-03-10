import { Document, Types } from "mongoose";

export interface IClaimModel extends Document {
    _id: string;
    cosmosAddress: string;
    etherAddress: string;
    transactionHash: string;
    createdAt: Date;
    updatedAt: Date;
}