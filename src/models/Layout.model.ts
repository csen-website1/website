import mongoose, { Schema, Document } from "mongoose";

export interface LayoutModel extends Document {
  videoUrl: string;
  downloadUrl: string;
  fichDesUrl: string;
}

const LayoutSchema: Schema = new Schema({
  videoUrl: {
    type: String,
    default: "https://www.youtube.com/watch?v=6v2L2UGZJAM",
  },
  downloadUrl: { type: String },
  fichDesUrl: { type: String },
});

export const LayoutModel =
  mongoose.models.LayoutModel ||
  mongoose.model<LayoutModel>("LayoutModel", LayoutSchema);

// export const UserModel =
//   mongoose.models.UserModel || mongoose.model<User>("UserModel", UserSchema);
