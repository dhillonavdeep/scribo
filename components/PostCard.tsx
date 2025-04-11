'use client';

import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

interface PostCardProps {
  _id: string;
  title: string;
  summary: string;
  author: string;
  image?: string;
  createdAt?: string;
}

export default function PostCard({
  _id,
  title,
  summary,
  author,
  image,
  createdAt,
}: PostCardProps) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (createdAt) {
      setFormattedDate(format(new Date(createdAt), 'PPP'));
    }
  }, [createdAt]);

  return (
    <Link href={`/posts/${_id}`} className="text-decoration-none text-dark postcard-link">
      <Card className="h-100 border-0 shadow-sm hover-shadow rounded-4 overflow-hidden">
        {image && (
          <div
            style={{
              height: '180px',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
        <Card.Body className="p-4">
          <Card.Title className="fs-5 fw-bold mb-2 card-title">{title}</Card.Title>
          <Card.Text className="postcard-summary small mb-3">
            {summary.length > 120 ? summary.slice(0, 120) + '...' : summary}
          </Card.Text>
          <Card.Subtitle className="postcard-meta small">
            By {author} {formattedDate && <>• {formattedDate}</>}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </Link>
  );
}
