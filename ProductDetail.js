import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const products = {
  1: { name: 'Ноутбук', price: 50000, description: 'Мощный ноутбук для работы и учебы.' },
  2: { name: 'Смартфон', price: 30000, description: 'Современный смартфон с отличной камерой.' },
  3: { name: 'Наушники', price: 5000, description: 'Беспроводные наушники с шумоподавлением.' },
};

export default function ProductDetail() {
  const { id } = useParams(); // параметр из URL
  const navigate = useNavigate(); // программная навигация
  const product = products[id];

  if (!product) {
    return (
      <div className="page">
        <h1>Товар не найден</h1>
        <button className="btn" onClick={() => navigate('/products')}>Назад к каталогу</button>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>{product.name}</h1>
      <p><strong>{product.price.toLocaleString('ru-RU')} ₽</strong></p>
      <p>{product.description}</p>
      <button className="btn" onClick={() => navigate(-1)}>← Назад</button>
      <button className="btn" style={{ marginLeft: '10px' }} onClick={() => navigate('/contact')}>Заказать</button>
    </div>
  );
}
