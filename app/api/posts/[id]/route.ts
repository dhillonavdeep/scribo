import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const id = (await params).id
  const data = await req.json();
  const updatedPost = await Post.findByIdAndUpdate((await params).id, data, { new: true });
  return NextResponse.json({ success: true, data: updatedPost });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  await Post.findByIdAndDelete((await params).id);
  return NextResponse.json({ success: true, message: 'Post deleted' });
}
