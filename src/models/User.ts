import mongoose, { Schema } from "mongoose";

interface User {
  interest: string;
  userType: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  address: string;
  phoneNumber: string;
  companyName?: string;
  message: [string];
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  interest: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    match: /^[a-zA-Z]+$/,
  },
  lastName: {
    type: String,
    required: true,
    match: /^[a-zA-Z]+$/,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  companyName: {
    type: String,
    required: false,
  },
  message: {
    type: [Object],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel =
  mongoose.models.UserModel || mongoose.model<User>("UserModel", UserSchema);
