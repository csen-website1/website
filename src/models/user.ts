import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  lastName: string;
  title: string;
  email: string;
  address?: string;
  phone: string;
  status: string;
  company?: string;
  target: string;
  messages: object[];
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: String,
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  company: String,
  target: {
    type: String,
    required: true,
  },
  messages: {
    type: [Object],
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
