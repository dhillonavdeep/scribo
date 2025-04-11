// app/posts/page.tsx
import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import SearchablePostList from '@/components/SearchablePostList';
import { Container } from 'react-bootstrap';

export default async function AllPostsPage() {
  await dbConnect();
  const posts = await Post.find({}).sort({ createdAt: -1 }).lean();

  return (
    <Container className="py-5">
      <h2 className="mb-4 fw-semibold all-posts-heading">All Scribo Posts</h2>
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
