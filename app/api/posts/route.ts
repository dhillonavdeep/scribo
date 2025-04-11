// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';

export async function GET() {
  await dbConnect();
  const posts = await Post.find({});
  return NextResponse.json({ success: true, data: posts });
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { title, content, summary, keywords, author, image } = body;

    const newPost = await Post.create({ title, content, summary, keywords, author, image });

    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to create post' }, { status: 400 });
  }
}

