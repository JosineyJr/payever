import { Schema } from 'mongoose';

export const AvatarSchema: Schema = new Schema(
  {
    userId: { type: Number, required: true },
    hash: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);
