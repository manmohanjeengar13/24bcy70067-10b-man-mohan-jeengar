import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  userId: string;
  title: string;
  description: string;
}

const PostSchema = new Schema<IPost>(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Post ?? mongoose.model<IPost>("Post", PostSchema);