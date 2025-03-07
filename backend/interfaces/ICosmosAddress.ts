import { Document } from 'mongoose';

export interface ICosmosAddressModel extends Document {
  address: string;
  // Add any additional fields that may be needed in the future
}

export interface ICosmosAddress {
    _id: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}