import React from 'react';

// 1.1. Приветственное сообщение
export function WelcomeMessage({ name, age }) {
  return <p>Добро пожаловать, {name}! Вам {age} лет.</p>;
}

// 1.2. Карточка пользователя
export function UserCard({ user }) {
  const { name, email, avatar, isOnline } = user;
  return (
    <div className="card">
      <img src={avatar} alt={name} width="50" />
      <h3>{name} {isOnline && <span className="success">● онлайн</span>}</h3>
      <p>{email}</p>
    </div>
  );
}

// 1.3. Кнопка с вариантами
export function Button({ variant = 'primary', size = 'medium', onClick, children }) {
  const className = `btn btn--${variant}${size !== 'medium' ? ` btn--${size}` : ''}`;
  return <button className={className} onClick={onClick}>{children}</button>;
}

// 2.1. Карточка с children
export function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

// 2.2. Переключатель видимости
export function Toggle({ children }) {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(!visible)}>
        {visible ? 'Скрыть' : 'Показать'}
      </Button>
      {visible && <div style={{ marginTop: '10px' }}>{children}</div>}
    </div>
  );
}

// 2.3. Условные сообщения
export function ConditionalMessage({ status }) {
  const messages = {
    success: 'Операция выполнена успешно!',
    error: 'Произошла ошибка!',
    warning: 'Внимание! Проверьте данные.'
  };
  if (!messages[status]) return null;
  return <p className={status}>{messages[status]}</p>;
}
