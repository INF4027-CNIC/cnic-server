import mongoose, { SchemaType, SchemaTypes } from 'mongoose';
import { USER } from 'src/users/users.costants';

export const AdminSchema = new mongoose.Schema({
  userData: {
    type: SchemaTypes.ObjectId,
    ref: USER,
  },

  metadata: {
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },

    updatedAt: {
      type: Date,
      default: () => Date.now(),
    },
  },

  hash: String,

  hashRt: String,
});

AdminSchema.pre('save', function (next) {
  this.metadata.updatedAt = new Date(Date.now());
  next();
});

export interface Admin {
  id: string;

  userData: string;

  metadata: {
    createdAt: Date;
    updatedAt: Date;
  };

  hash: string;
  hashRt: string;
}
