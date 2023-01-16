import mongoose, { SchemaTypes } from 'mongoose';
import { Roles } from 'src/common/enums';
import { USER } from 'src/users/users.costants';

export const AdminSchema = new mongoose.Schema({
  adminCode: {
    type: Number,
    default: () => Date.now() + Math.floor(Math.random() * 100),
    unique: true,
    immutable: true,
  },

  userRef: {
    type: SchemaTypes.ObjectId,
    unique: true,
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

  roles: {
    type: [String],
    default: [Roles.Admin, Roles.User],
  },

  hash: String,

  hashRt: String,
});

export interface Admin {
  id: string;

  isActive: boolean;

  password: string;

  adminCode: number;

  userRef: string;

  metadata: {
    nominateAt: Date;
    denominateAt: Date;
  };

  hash: string;
  hashRt: string;
}
