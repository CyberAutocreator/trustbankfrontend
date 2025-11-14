import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <p>
        Go back to <Link to="/">Home</Link>.
      </p>
    </div>
  );
}
