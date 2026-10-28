import React, { useState } from 'react';

// Задание 1: управляемые компоненты
export default function UserRegistrationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    subscribe: false,
    age: '',
    about: ''
  });

  // Один обработчик для всех полей
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Данные формы:', form);
    alert('Форма отправлена! Данные в консоли.');
  };

  return (
    <div className="form-card">
      <h2>Задание 1: Регистрация (управляемые компоненты)</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Имя</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Пароль</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Подтверждение пароля</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
        </div>
        <div className="field radio-group">
          <label>Пол:</label>
          <label><input type="radio" name="gender" value="male" checked={form.gender === 'male'} onChange={handleChange} /> Мужской</label>
          <label><input type="radio" name="gender" value="female" checked={form.gender === 'female'} onChange={handleChange} /> Женский</label>
        </div>
        <div className="field checkbox-group">
          <label><input type="checkbox" name="subscribe" checked={form.subscribe} onChange={handleChange} /> Подписаться на рассылку</label>
        </div>
        <div className="field">
          <label>Возраст</label>
          <select name="age" value={form.age} onChange={handleChange}>
            <option value="">Выберите возраст</option>
            <option value="18-25">18–25</option>
            <option value="26-35">26–35</option>
            <option value="36-50">36–50</option>
            <option value="50+">50+</option>
          </select>
        </div>
        <div className="field">
          <label>О себе</label>
          <textarea name="about" value={form.about} onChange={handleChange} />
        </div>
        <button type="submit" className="btn">Зарегистрироваться</button>
      </form>
    </div>
  );
}
