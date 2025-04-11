import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';
import PostCard from '@/components/PostCard';

export default async function HomePage() {
  await dbConnect();
  const posts = await Post.find({}).sort({ createdAt: -1 }).limit(3).lean();

  return (
    <>
      {/* Dark Hero Section */}
      <section className="bg-secondary text-white py-5 text-center">
        <Container className="px-4 px-md-0">
          <h1 className="display-4 fw-bold">Scribo</h1>
          <p className="lead text-light opacity-75">
            Thoughtful blogging meets elegant minimalism. Share your voice, your way.
          </p>

          <Link href="/create" passHref>
            <Button
              size="lg"
              variant="light"
              className="d-inline-flex align-items-center gap-2 px-4 py-2 fs-5 fw-medium shadow-sm"
              style={{ borderRadius: '40px' }}
            >
              <img src="/logo.png" height={24} alt="Scribo logo" />
              Start Writing
            </Button>
          </Link>
        </Container>
      </section>

      {/* Featured Posts */}
      <Container className="py-5">
        <h2 className="fs-4 fw-semibold text-start mb-4">Featured Posts</h2>
        <Row>
          {posts.map((post: any) => (
            <Col key={post._id} md={6} lg={4} className="mb-4">
              <PostCard
                _id={post._id.toString()}
                title={post.title}
                summary={post.summary}
                author={post.author}
                image={post.image}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
