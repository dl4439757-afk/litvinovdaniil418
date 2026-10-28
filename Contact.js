import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Передаем данные через state следующему маршруту
    navigate('/contact-success', { state: { name: form.name } });
  };

  return (
    <div className="page">
      <h1>Связаться с нами</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Имя</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="field">
          <label>Сообщение</label>
          <textarea name="message" value={form.message} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn">Отправить</button>
      </form>
    </div>
  );
}
