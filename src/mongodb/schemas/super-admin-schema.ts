import mongoose from 'mongoose';

export const SuperAdminSchema = new mongoose.Schema<SuperAdmin>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  hash: {
    type: String,
    required: true,
    trim: true,
  },
});

export interface SuperAdmin {
  id: string;
  email: string;
  hash: string;
}
