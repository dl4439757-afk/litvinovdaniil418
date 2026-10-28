import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page">
      <h1>Добро пожаловать в наш магазин!</h1>
      <p>Лучшие товары по лучшим ценам.</p>
      <Link to="/products" className="btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
        Перейти к товарам
      </Link>
    </div>
  );
}
