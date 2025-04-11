import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import PostForm from '@/components/PostForm';
import { Container } from 'react-bootstrap';

export default async function CreatePage() {
  const session = await auth();
  if (!session) redirect('/');

  return (
    <Container className="py-5" style={{ maxWidth: '720px' }}>
      <h1 className="mb-1 fw-bold">✍️ Create a New Post</h1>
      <p className="text-muted mb-4">Begin your story — a title, a thought, an idea.</p>
      <PostForm user={session.user} />
    </Container>
  );
}
