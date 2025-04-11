import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { ReactNode } from 'react';
import ScriboNavbar from '@/components/Navbar';
import Providers from './providers';
import { metadata } from './metadata';  // import from separate file

export { metadata }; // export from here (still allowed)

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ScriboNavbar />
          {children}
          <footer className="text-center py-3 small border-top mt-5 footer">
            <div className="d-inline-flex align-items-center gap-2">
              <img src="/logo.png" height={20} alt="Scribo logo" />
              <span className="footer-text">&copy; 2025 Scribo – Where ideas take shape.</span>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
