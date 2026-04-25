import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  postId: string;
  userId: string;
  content: string;
}

const CommentSchema = new Schema<IComment>(
  {
    postId: { type: String, required: true, index: true },
    userId: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Comment ?? mongoose.model<IComment>("Comment", CommentSchema);