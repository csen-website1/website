import mongoose, { Schema, Document } from "mongoose";

export interface Layout {
  name: string;
  description: string;
  // Add more properties as needed
}
export interface LayoutModel extends Document {
  title: string;
  hero: string;
  videoUrl: string;
}

const LayoutSchema: Schema = new Schema({
  name: { type: String, required: false },
  description: { type: String, required: false },
  videpUrl: { type: String, required: true },
  // Add more properties as needed
});

export default mongoose.model<LayoutModel>("Layout", LayoutSchema);
