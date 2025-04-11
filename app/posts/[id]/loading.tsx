'use client';
import './loading.css';

export default function Loading() {
  return (
    <div className="scribo-loader-overlay">
      <div className="loader">
        <div className="bar bar1"></div>
        <div className="bar bar2"></div>
        <div className="bar bar3"></div>
        <div className="bar bar4"></div>
        <div className="bar bar5"></div>
      </div>
    </div>
  );
}
