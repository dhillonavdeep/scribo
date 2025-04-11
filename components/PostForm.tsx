'use client';

import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import { Alert, Button, Spinner, Form } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


type Props = {
  user: Session['user'];
  post?: any;
  isEdit?: boolean;
};

export default function PostForm({ user, post, isEdit }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    content: '',
    summary: '',
    keywords: '',
    image: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && post) {
      setForm({
        title: post.title,
        content: post.content,
        summary: post.summary,
        keywords: post.keywords?.join(', ') || '',
        image: post.image || '',
      });
    }
  }, [isEdit, post]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch(isEdit ? `/api/posts/${post._id}` : '/api/posts', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          summary: form.summary,
          keywords: form.keywords.split(',').map(k => k.trim()),
          author: user.name,
          image: form.image,
        }),
      });

      if (!res.ok) throw new Error('Failed to save post');
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '700px' }}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Control
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="border-0 border-bottom fs-2 fw-semibold mb-4"
        required
      />

      <Form.Control
        as="textarea"
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Write your story..."
        rows={12}
        className="border-0 mb-4"
        style={{ resize: 'vertical', lineHeight: '1.8' }}
        required
      />

      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold">Summary</Form.Label>
        <Form.Control
          type="text"
          name="summary"
          value={form.summary}
          onChange={handleChange}
          placeholder="TL;DR for your readers..."
          required
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold">Keywords (comma separated)</Form.Label>
        <Form.Control
          type="text"
          name="keywords"
          value={form.keywords}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold">Cover Image</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        {form.image && (
          <div className="text-center mt-3">
            {form.image && (
              <Image
                src={form.image}
                alt="Preview"
                width={800}
                height={400}
                unoptimized
                className="rounded shadow mt-3"
                style={{ objectFit: 'cover', width: '100%' }}
              />
)}

          </div>
        )}
      </Form.Group>

      <div className="text-center">
        <Button type="submit" variant="primary" size="lg" disabled={submitting}>
          {submitting ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              {isEdit ? 'Saving...' : 'Publishing...'}
            </>
          ) : (
            isEdit ? 'Save Changes' : 'Publish'
          )}
        </Button>
      </div>
    </Form>
  );
}
  