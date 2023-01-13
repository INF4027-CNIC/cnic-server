import mongoose from 'mongoose';

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
    default: '',
  },

  birth: {
    date: {
      type: Date,
      require: true,
    },
    place: {
      type: String,
      require: true,
      trim: true,
    },
  },

  code: {
    type: Number,
    default: () => 1,
    unique: true,
    immutable: true,
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
    date: Date;
    place: string;
  };
  code: number;

  metadata: {
    createdAt: Date;
    updatedAt: Date;
  };

  hash: string;
  hashRt: string;

  // virtual
  fullname: string;
}
