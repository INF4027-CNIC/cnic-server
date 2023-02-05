import mongoose from 'mongoose';
import { Roles } from 'src/common/enums';
import { generateUUID } from 'src/common/helpers';

export const UserSchema = new mongoose.Schema<User>({
  name: {
    first: {
      type: String,
      maxLength: 30,
      index: true,
      require: true,
      trim: true,
      lowercase: true,
    },
    last: {
      type: String,
      maxLength: 30,
      index: true,
      require: true,
      trim: true,
      lowercase: true,
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

  cniInfos: {
    cniCode: {
      type: String,
      default: () => generateUUID(),
    },

    deliveryDate: {
      type: Date,
      required: true,
    },

    expiryDate: {
      type: Date,
      required: true,
    },
  },

  metadata: {
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
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

  cniInfos: {
    cniCode: string;
    deliveryDate: Date;
    expiryDate: Date;
  };

  hash: string;
  hashRt: string;

  // virtual
  fullname: string;
}
