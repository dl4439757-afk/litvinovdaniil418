import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Ноутбук', price: 50000 },
  { id: 2, name: 'Смартфон', price: 30000 },
  { id: 3, name: 'Наушники', price: 5000 },
];

export default function Products() {
  return (
    <div className="page">
      <h1>Каталог товаров</h1>
      {products.map(p => (
        <div key={p.id} className="product-card">
          <Link to={`/products/${p.id}`}>{p.name}</Link>
          <p>{p.price.toLocaleString('ru-RU')} ₽</p>
        </div>
      ))}
    </div>
  );
}
