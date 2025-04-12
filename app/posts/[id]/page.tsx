import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import { notFound } from 'next/navigation';
import { Container } from 'react-bootstrap';
import { format } from 'date-fns';
import { auth } from '@/lib/auth';
import { IPost } from '@/models/Post';
import DeleteButton from '@/components/DeleteButton';
import Image from 'next/image';


export default async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  
  const id = (await params).id // ✅ Await params
  await dbConnect();
  const post = (await Post.findById(id).lean()) as unknown as IPost;
  if (!post) return notFound();

  const session = await auth();
  const isAuthor = session?.user?.name === post.author;

  return (
    <Container className="py-5" style={{ maxWidth: '800px' }}>
      {post.image && (
          <Image
          src={post.image}
          alt={post.title}
          width={900}
          height={400}
          unoptimized
          className="img-fluid rounded mb-4"
          style={{ objectFit: 'cover', width: '100%', maxHeight: '400px' }}
        />
      
      )}

      <h1 className="fw-bold display-5 mb-3">{post.title}</h1>

      <p className="text-muted mb-4 fs-6">
        By <strong>{post.author}</strong> • {format(new Date(post.createdAt ?? ''), 'PPPp')}
      </p>

      <hr />

      <div className="fs-5 lh-lg mb-4" style={{ whiteSpace: 'pre-line' }}>
        {post.content}
      </div>

      {post.summary && (
        <div className="bg-light border-start border-4 border-primary p-3 rounded-3 mb-4">
          {post.summary}
        </div>      
      )}

      {post.keywords?.length > 0 && (
        <div className="mb-4">
          <strong>Tags:</strong>{' '}
          {post.keywords.map((k, i) => (
            <span key={i} className="badge bg-secondary me-2">
              #{k}
            </span>
          ))}
        </div>
      )}

      {isAuthor && (
        <div className="d-flex gap-3 justify-content-end">
          <a href={`/posts/${post._id}/edit`} className="btn btn-outline-warning">
            ✏️ Edit
          </a>
          <DeleteButton postId={post._id?.toString() ?? ''} />
        </div>
      )}
    </Container>
  );
}
