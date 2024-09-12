import mongoose, { Schema, Document } from "mongoose";

export interface Layout {
  name: string;
  description: string;
  // Add more properties as needed
}
export interface LayoutModel extends Document {
  videoUrl: string;
  downloadUrl: string;
}

const LayoutSchema: Schema = new Schema({
  videpUrl: { type: String },
  downloadUrl: { type: String },
  // Add more properties as needed
});

export default mongoose.model<LayoutModel>("Layout", LayoutSchema);
