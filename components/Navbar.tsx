'use client';

import Link from 'next/link';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ScriboNavbar() {
  const { data: session } = useSession();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') setDark(true);
  }, []);

  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  const navLinkClass = `nav-link ${dark ? 'text-light' : 'text-dark'}`;

  return (
    <Navbar
      bg={dark ? 'dark' : 'white'}
      expand="lg"
      sticky="top"
      className={`shadow-sm px-3 ${dark ? 'navbar-dark' : ''}`}
    >
      <Container>
        <Link href="/" className="navbar-brand d-flex align-items-center gap-2">
          <img src="/logo.png" alt="Scribo Logo" height="32" />
          <span className={`fw-bold fs-4 ${dark ? 'text-light' : 'text-primary'}`}>Scribo</span>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-2 d-flex align-items-center gap-4 fw-semibold">
            <Link href="/posts" className={navLinkClass}>
              All Posts
            </Link>

            {session?.user && (
              <>
                <Link href="/your-posts" className={navLinkClass}>
                  Your Blogs
                </Link>
                <Link href="/create" className={navLinkClass}>
                  + New Post
                </Link>
                <button
                  className="btn btn-link text-danger fw-semibold text-decoration-none"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </>
            )}

            {!session?.user && (
              <button
                className={`btn btn-link fw-semibold text-decoration-none ${dark ? 'text-light' : 'text-dark'}`}
                onClick={() => signIn('google')}
              >
                Login
              </button>
            )}

            <DarkModeToggle dark={dark} setDark={setDark} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

interface DarkModeToggleProps {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
}

function DarkModeToggle({ dark, setDark }: DarkModeToggleProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setDark(!dark)}
      className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
      style={{
        width: '34px',
        height: '34px',
        transition: 'transform 0.3s ease',
        transform: dark ? 'rotate(180deg)' : 'rotate(0deg)'
      }}
      title="Toggle dark mode"
    >
      {dark ? <FaSun size={16} /> : <FaMoon size={16} />}
    </button>

  );
}


