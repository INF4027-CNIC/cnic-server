import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    maxLength: 30,
    index: true,
    require: true,
    trim: true,
  },

  lastname: {
    type: String,
    maxLength: 30,
    index: true,
    require: true,
    trim: true,
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
    date: Date,
    place: String,
    require: true,
  },

  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },

  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },

  uniqueIdentity: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
    unique: true,
    immutable: true,
  },
});

UserSchema.virtual('fullName').get(function () {
  return this.firstname + ' ' + this.lastname;
});

UserSchema.pre('save', function (next) {
  this.updatedAt = new Date(Date.now());
  next();
});

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  phone: number;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}
