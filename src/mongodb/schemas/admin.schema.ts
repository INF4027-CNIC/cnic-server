import mongoose, { SchemaTypes } from 'mongoose';
import { Roles } from 'src/common/enums';
import { generateUUID } from 'src/common/helpers';
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

  userRef: string;

  metadata: {
    nominateAt: Date;
    denominateAt: Date;
  };

  hash: string;
  hashRt: string;
}
