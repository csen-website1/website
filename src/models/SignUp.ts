import mongoose, { Schema, model, Document } from "mongoose";

export interface SignUpModel extends Document {
  userName: string;
  email: string;
  password: string;
  role: string;
  plan: string;
  createdAt: Date;
}

const signUpSchema: Schema = new Schema<SignUpModel>({
  userName: { type: String, required: true },
  plan: { type: String, default: "free" },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.SignUp ||
  model<SignUpModel>("SignUp", signUpSchema);
