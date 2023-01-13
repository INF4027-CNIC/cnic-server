import mongoose, { SchemaTypes } from 'mongoose';
import { USER } from 'src/users/users.costants';

export const AdminSchema = new mongoose.Schema({
  userData: {
    type: SchemaTypes.ObjectId,
    ref: USER,
  },

  metadata: {
    nominatedAd: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },

    denominatedAt: {
      type: Date,
      default: () => Date.now(),
    },
  },

  hash: String,

  hashRt: String,
});

export interface Admin {
  id: string;

  userData: string;

  metadata: {
    nominateAt: Date;
    denominateAt: Date;
  };

  hash: string;
  hashRt: string;
}
