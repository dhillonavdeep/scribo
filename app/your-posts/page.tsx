// app/your-posts/page.tsx
import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SearchablePostList from '@/components/SearchablePostList';
import { Container } from 'react-bootstrap';

export default async function YourPostsPage() {
  const session = await auth();
  if (!session) redirect('/');

  await dbConnect();

  const posts = await Post.find({ author: session.user?.name }).sort({ createdAt: -1 }).lean();

  return (
    <Container className="py-5">
      <h2 className="mb-4 fw-semibold">Your Posts</h2>
      <SearchablePostList posts={posts.map((post: any) => ({
        _id: post._id.toString(),
        title: post.title,
        summary: post.summary,
        author: post.author,
        keywords: post.keywords,
        createdAt: post.createdAt?.toString() || '',
        image: post.image || '',
      }))} />
    </Container>
  );
}
