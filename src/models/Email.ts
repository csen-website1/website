import mongoose, { Schema, Document } from "mongoose";

export interface IEmail extends Document {
  email: string;
}

const EmailSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
});

export default mongoose.models.EmailModel ||
  mongoose.model<IEmail>("EmailModel", EmailSchema);
