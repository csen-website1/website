import mongoose, { Schema, Document } from "mongoose";
import { date } from "zod";

export interface IEmail extends Document {
  email: string;
}

const EmailSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    date: {
      type: Date,
      default: Date.now,
    },
  },
});

export default mongoose.models.EmailModel ||
  mongoose.model<IEmail>("EmailModel", EmailSchema);
