import mongoose, { Schema, model, Document } from "mongoose";

export interface SignUpModel extends Document {
  userName: string;
  email: string;
  password: string;
  createdAt: Date;
}

const signUpSchema: Schema = new Schema<SignUpModel>({
  userName: { type: String, required: true },

  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.SignUp ||
  model<SignUpModel>("SignUp", signUpSchema);
