import mongoose from 'mongoose';
import { Roles } from 'src/common/enums';

export const UserSchema = new mongoose.Schema<User>({
  name: {
    first: {
      type: String,
      maxLength: 30,
      index: true,
      require: true,
      trim: true,
    },
    last: {
      type: String,
      maxLength: 30,
      index: true,
      require: true,
      trim: true,
    },
  },

  phone: {
    type: Number,
    require: true,
    unique: true,
  },

  avatar: {
    type: String,
    trim: true,
  },

  birth: {
    date: {
      type: Number,
      require: true,
    },
    place: {
      type: String,
      require: true,
      trim: true,
    },
  },

  size: {
    type: Number,
    min: 0,
    max: 4,
  },

  gender: String,

  profession: {
    type: String,
    required: true,
  },

  code: {
    type: Number,
    default: () => Date.now() + Math.floor(Math.random() * 100),
    unique: true,
    immutable: true,
  },

  address: {
    type: String,
    required: true,
  },

  fathername: {
    type: String,
    require: true,
  },

  mothername: {
    type: String,
    required: true,
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

  roles: {
    type: [String],
    default: [Roles.User],
  },

  hash: String,

  hashRt: String,
});

UserSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last;
});

UserSchema.pre('save', function (next) {
  this.metadata.updatedAt = new Date(Date.now());
  next();
});

export interface User {
  id: string;
  name: {
    first: string;
    last: string;
  };
  phone: number;
  avatar: string;
  birth: {
    date: number;
    place: string;
  };

  size: number;

  gender: string;

  profession: string;

  code: number;

  address: string;

  roles: string[];

  fathername: string;
  mothername: string;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
  };

  hash: string;
  hashRt: string;

  // virtual
  fullname: string;
}
