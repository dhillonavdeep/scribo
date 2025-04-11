import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import SearchablePostList from '@/components/SearchablePostList';
import { Container } from 'react-bootstrap';

// Define PostType locally or move it to a separate types.ts file
type PostType = {
  _id: string;
  title: string;
  summary: string;
  author: string;
  keywords?: string[];
  createdAt?: string;
  image?: string;
};

export default async function AllPostsPage() {
  await dbConnect();
  const rawPosts = await Post.find({}).sort({ createdAt: -1 }).lean();

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
      <h2 className="mb-4 fw-semibold all-posts-heading">All Scribo Posts</h2>
      <SearchablePostList posts={posts} />
    </Container>
  );
}
