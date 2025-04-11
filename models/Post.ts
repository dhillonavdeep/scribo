import { Schema, model, models } from 'mongoose';

// Define the TypeScript interface for a blog post
export interface IPost {
  _id?: string;
  title: string;
  content: string;
  summary: string;
  keywords: string[];
  author: string;
  image?: string;         // ✅ NEW: optional image field (base64 or URL)
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Mongoose schema
const PostSchema = new Schema<IPost>(
  {
    title:    { type: String, required: true },
    content:  { type: String, required: true },
    summary:  { type: String, required: true },
    keywords: { type: [String], default: [] },
    author:   { type: String, required: true },
    image:    { type: String },              // ✅ NEW: image as string (optional)
  },
  { timestamps: true }
);

// Export the model or reuse existing one
const Post = models.Post || model<IPost>('Post', PostSchema);

export default Post;
