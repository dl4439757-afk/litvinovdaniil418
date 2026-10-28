import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page" style={{ textAlign: 'center' }}>
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link to="/" className="btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
        На главную
      </Link>
    </div>
  );
}
