'use client';

import { useState } from 'react';
import { Form, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import PostCard from './PostCard';
import { FaSearch, FaSortAmountDown } from 'react-icons/fa';

type PostType = {
  _id: string;
  title: string;
  summary: string;
  author: string;
  keywords?: string[];
  createdAt?: string;
  image?: string;
};

export default function SearchablePostList({ posts }: { posts: PostType[] }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [page, setPage] = useState(1);

  const POSTS_PER_PAGE = 6;

  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase()) ||
      post.keywords?.some(k =>
        k.toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return new Date(b.createdAt ?? '').getTime() - new Date(a.createdAt ?? '').getTime();
    });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  return (
    <>
      {/* 🔍 Search Bar with Filter */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="position-relative flex-grow-1">
          <Form.Control
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="ps-5 py-2 rounded-pill shadow-sm"
            style={{ border: '1px solid #ccc', backgroundColor: '#fafafa' }}
          />
          <FaSearch
            className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
            style={{ fontSize: '1rem' }}
          />
        </div>

        <DropdownButton
          title={<FaSortAmountDown />}
          variant="outline-secondary"
          className="rounded-circle"
          style={{ width: '42px', height: '42px' }}
        >
          <Dropdown.Item active={sortBy === 'date'} onClick={() => setSortBy('date')}>
            Newest First
          </Dropdown.Item>
          <Dropdown.Item active={sortBy === 'title'} onClick={() => setSortBy('title')}>
            Title A–Z
          </Dropdown.Item>
        </DropdownButton>
      </div>

      {/* Posts */}
      <Row>
        {paginatedPosts.map((post) => (
          <Col key={post._id} md={6} lg={4} className="mb-4">
            <PostCard {...post} />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-outline-primary"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            ← Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            className="btn btn-outline-primary"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </>
  );
}
