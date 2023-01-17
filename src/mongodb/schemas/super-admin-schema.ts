import mongoose from 'mongoose';

export const SuperAdminSchema = new mongoose.Schema<SuperAdmin>({
  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },

  hashRt: {
    type: String,
    required: true,
    trim: true,
  },
});

export interface SuperAdmin {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  hashRt: string;
}
