import mongoose, { Schema, model, Document } from "mongoose";

export interface TestoModel extends Document {
  name: string;
  occupation: string;
  message: string;
  createdAt: Date;
}

const testosSchema: Schema<TestoModel> = new Schema<TestoModel>({
  name: { type: String, required: true },
  occupation: { type: String, default: "" },
  message: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Testos ||
  model<TestoModel>("Testos", testosSchema);
