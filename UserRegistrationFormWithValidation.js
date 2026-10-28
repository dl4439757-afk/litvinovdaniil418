import React, { useState } from 'react';

// Задание 2: валидация формы
export default function UserRegistrationFormWithValidation() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    gender: '', subscribe: false, age: '', about: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    // Сбрасываем ошибку поля при изменении
    if (errors[name]) setErrors(err => ({ ...err, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Имя обязательно';
    if (!form.email.trim()) newErrors.email = 'Email обязателен';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Некорректный формат email';
    if (!form.password) newErrors.password = 'Пароль обязателен';
    else if (form.password.length < 8) newErrors.password = 'Пароль минимум 8 символов';
    if (!form.confirmPassword) newErrors.confirmPassword = 'Подтвердите пароль';
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают';
    if (!form.gender) newErrors.gender = 'Выберите пол';
    if (!form.age) newErrors.age = 'Выберите возраст';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
    console.log('Валидные данные:', form);
  };

  const fieldError = (name) => errors[name] && <div className="error">{errors[name]}</div>;
  const inputClass = (name) => errors[name] ? 'error-input' : '';

  if (submitted) {
    return (
      <div className="form-card">
        <h2>Регистрация с валидацией</h2>
        <p className="success">✅ Регистрация прошла успешно!</p>
        <button className="btn" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', password: '', confirmPassword: '', gender: '', subscribe: false, age: '', about: '' }); }}>
          Заполнить снова
        </button>
      </div>
    );
  }

  return (
    <div className="form-card">
      <h2>Задание 2: Регистрация с валидацией</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label>Имя *</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className={inputClass('name')} />
          {fieldError('name')}
        </div>
        <div className="field">
          <label>Email *</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass('email')} />
          {fieldError('email')}
        </div>
        <div className="field">
          <label>Пароль (мин. 8 символов) *</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} className={inputClass('password')} />
          {fieldError('password')}
        </div>
        <div className="field">
          <label>Подтверждение пароля *</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className={inputClass('confirmPassword')} />
          {fieldError('confirmPassword')}
        </div>
        <div className="field radio-group">
          <label>Пол *</label>
          <label><input type="radio" name="gender" value="male" checked={form.gender === 'male'} onChange={handleChange} /> Мужской</label>
          <label><input type="radio" name="gender" value="female" checked={form.gender === 'female'} onChange={handleChange} /> Женский</label>
          {fieldError('gender')}
        </div>
        <div className="field checkbox-group">
          <label><input type="checkbox" name="subscribe" checked={form.subscribe} onChange={handleChange} /> Подписаться на рассылку (необязательно)</label>
        </div>
        <div className="field">
          <label>Возраст *</label>
          <select name="age" value={form.age} onChange={handleChange} className={inputClass('age')}>
            <option value="">Выберите возраст</option>
            <option value="18-25">18–25</option>
            <option value="26-35">26–35</option>
            <option value="36-50">36–50</option>
            <option value="50+">50+</option>
          </select>
          {fieldError('age')}
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
