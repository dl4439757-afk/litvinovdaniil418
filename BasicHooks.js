import React, { useState, useEffect, useReducer } from 'react';

// useState: счетчик
export function StateCounter() {
  const [count, setCount] = useState(0);
  // Функциональное обновление — избегаем stale closure
  return (
    <div className="card">
      <h3>useState счетчик</h3>
      <p>Count: {count}</p>
      <button className="btn btn--primary" onClick={() => setCount(c => c + 1)}>+1</button>
      <button className="btn btn--primary" onClick={() => setCount(c => c + 5)}>+5</button>
      <button className="btn btn--secondary" onClick={() => setCount(0)}>Сброс</button>
    </div>
  );
}

// useState: объект состояния
export function ObjectState() {
  const [user, setUser] = useState({ name: 'Даниил', age: 20 });
  return (
    <div className="card">
      <h3>useState с объектом</h3>
      <p>{user.name}, {user.age} лет</p>
      <input type="text" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} />
      <button className="btn btn--primary" onClick={() => setUser(u => ({ ...u, age: u.age + 1 }))}>+1 год</button>
    </div>
  );
}

// useEffect: таймер с очисткой
export function EffectTimer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id); // очистка при размонтировании
  }, []); // пустой массив — только монтирование
  return <div className="card"><h3>useEffect таймер: {seconds} сек</h3></div>;
}

// useEffect: подписка на событие
export function EffectEvent() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return <div className="card"><h3>Ширина окна: {width}px</h3></div>;
}

// useReducer: сложное состояние
const initialTodos = [];
function todoReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case 'toggle':
      return state.map(t => t.id === action.id ? { ...t, done: !t.done } : t);
    case 'remove':
      return state.filter(t => t.id !== action.id);
    default:
      throw new Error('Unknown action');
  }
}

export function ReducerTodos() {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  const [text, setText] = useState('');
  return (
    <div className="card">
      <h3>useReducer список задач</h3>
      <input type="text" placeholder="Новая задача" value={text} onChange={e => setText(e.target.value)} />
      <button className="btn btn--primary" onClick={() => { if (text.trim()) { dispatch({ type: 'add', text }); setText(''); } }}>Добавить</button>
      <ul>
        {todos.map(t => (
          <li key={t.id} style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
            <span onClick={() => dispatch({ type: 'toggle', id: t.id })} style={{ cursor: 'pointer' }}>{t.text}</span>{' '}
            <button className="btn btn--secondary" onClick={() => dispatch({ type: 'remove', id: t.id })}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// stale closure — демонстрация и решение
export function StaleClosureDemo() {
  const [count, setCount] = useState(0);
  // ПРОБЛЕМА: устаревшее замыкание
  const showStale = () => setTimeout(() => console.log('Stale count:', count), 2000);
  // РЕШЕНИЕ: функциональное обновление
  const showFresh = () => setTimeout(() => setCount(c => { console.log('Fresh count:', c); return c; }), 2000);
  return (
    <div className="card">
      <h3>Stale closure демо (смотри консоль)</h3>
      <p>Count: {count}</p>
      <button className="btn btn--primary" onClick={() => setCount(c => c + 1)}>+1</button>
      <button className="btn btn--secondary" onClick={showStale}>Stale (устареет)</button>
      <button className="btn btn--secondary" onClick={showFresh}>Fresh (актуально)</button>
    </div>
  );
}
