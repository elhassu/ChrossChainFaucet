import { Document } from 'mongoose';

export interface IEtherAddressModel extends Document {
  address: string;
  // Add any additional fields that may be needed in the future
}

export interface IEtherAddress {
    _id: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}