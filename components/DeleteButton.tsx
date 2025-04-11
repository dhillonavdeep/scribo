'use client';

import { useRouter } from 'next/navigation';

export default function DeleteButton({ postId }: { postId: string }) {
  const router = useRouter();

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });

    if (res.ok) {
      router.push('/'); // ✅ Go back to homepage after deletion
    } else {
      alert('Failed to delete post.');
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button type="submit" className="btn btn-danger">Delete</button>
    </form>
  );
}
