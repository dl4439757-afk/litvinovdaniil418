import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function ContactSuccess() {
  const location = useLocation();
  const name = location.state?.name; // данные, переданные через navigate

  return (
    <div className="page" style={{ textAlign: 'center' }}>
      <h1 className="success">✅ Сообщение отправлено!</h1>
      {name && <p>Спасибо, {name}! Мы ответим вам в ближайшее время.</p>}
      <Link to="/" className="btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
        На главную
      </Link>
    </div>
  );
}
