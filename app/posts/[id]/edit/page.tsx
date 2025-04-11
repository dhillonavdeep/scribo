import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import PostForm from '@/components/PostForm';
import { Container } from 'react-bootstrap';
import { IPost } from '@/models/Post';

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) redirect('/');

  const { id } = params;
// then use `id` instead of `params.id`

  const post = (await Post.findById(params.id).lean()) as unknown as IPost;

  if (!post || post.author !== session.user?.name) redirect('/');

  return (
    <Container className="py-5" style={{ maxWidth: '720px' }}>
      <h1 className="mb-1 fw-bold">🛠️ Edit Your Post</h1>
      <p className="text-muted mb-4">Make improvements, refine thoughts — it's your canvas.</p>
      <PostForm user={session.user} post={post} isEdit />
    </Container>
  );
}
