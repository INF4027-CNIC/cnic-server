import mongoose, { SchemaTypes } from 'mongoose';
import { USER } from 'src/users/users.costants';

export const AdminSchema = new mongoose.Schema({
  userRef: {
    type: SchemaTypes.ObjectId,
    ref: USER,
  },

  isActive: {
    type: Boolean,
    default: true,
    index: true,
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

  userRef: string;

  isActive: boolean;

  metadata: {
    nominateAt: Date;
    denominateAt: Date;
  };

  hash: string;
  hashRt: string;
}
