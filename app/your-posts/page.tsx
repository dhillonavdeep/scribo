import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SearchablePostList from '@/components/SearchablePostList';
import { Container } from 'react-bootstrap';

type PostType = {
  _id: string;
  title: string;
  summary: string;
  author: string;
  keywords?: string[];
  createdAt?: string;
  image?: string;
};

export default async function YourPostsPage() {
  const session = await auth();
  if (!session) redirect('/');

  await dbConnect();

  const rawPosts = await Post.find({ author: session.user?.name }).sort({ createdAt: -1 }).lean();

  const posts: PostType[] = rawPosts.map((post: any) => ({
    _id: post._id.toString(),
    title: post.title,
    summary: post.summary,
    author: post.author,
    keywords: post.keywords,
    createdAt: post.createdAt?.toString() || '',
    image: post.image || '',
  }));

  return (
    <Container className="py-5">
      <h2 className="mb-4 fw-semibold all-posts-heading">Your Posts</h2>
      <SearchablePostList posts={posts} />
    </Container>
  );
}
