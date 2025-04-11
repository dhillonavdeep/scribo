import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const data = await req.json();
  const updatedPost = await Post.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json({ success: true, data: updatedPost });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  await Post.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true, message: 'Post deleted' });
}
