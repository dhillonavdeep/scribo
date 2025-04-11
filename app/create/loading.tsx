export default function Loading() {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="spinner-border text-dark"
          role="status"
          style={{ width: '2.5rem', height: '2.5rem' }}
        />
      </div>
    );
  }
  