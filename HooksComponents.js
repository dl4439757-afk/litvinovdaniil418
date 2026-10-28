import React, { useState, useEffect, useContext, createContext } from 'react';

// 6.1. Счетчик на хуках
export function CounterWithHooks() {
  const [count, setCount] = useState(0);
  return (
    <div className="card">
      <h3>Счетчик (hooks): {count}</h3>
      <button className="btn btn--primary" onClick={() => setCount(count + 1)}>+1</button>
      <button className="btn btn--secondary" onClick={() => setCount(count - 1)}>-1</button>
      <button className="btn btn--secondary" onClick={() => setCount(0)}>Сброс</button>
    </div>
  );
}

// 6.2. Редактирование профиля
export function UserProfile() {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [saved, setSaved] = useState(false);
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setSaved(false);
  };
  return (
    <div className="card">
      <h3>Профиль пользователя</h3>
      <input type="text" name="name" placeholder="Имя" value={profile.name} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={profile.email} onChange={handleChange} />
      <button className="btn btn--primary" onClick={() => setSaved(true)}>Сохранить</button>
      {saved && <p className="success">Сохранено!</p>}
    </div>
  );
}

// 6.3. Демонстрация useEffect
export function EffectDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Без зависимостей — каждый рендер
  useEffect(() => { console.log('Каждый рендер'); });

  // С пустым массивом — только монтирование
  useEffect(() => { console.log('Только монтирование'); return () => console.log('Размонтирование'); }, []);

  // С зависимостью — при изменении count
  useEffect(() => { console.log('Count изменился:', count); }, [count]);

  return (
    <div className="card">
      <h3>EffectDemo</h3>
      <p>Count: {count}</p>
      <button className="btn btn--primary" onClick={() => setCount(count + 1)}>+1</button>
      <input type="text" placeholder="Имя (каждый рендер)" value={name} onChange={e => setName(e.target.value)} />
    </div>
  );
}

// 7.1. useLocalStorage
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

// 7.2. useFetch
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(url)
      .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(d => { if (!cancelled) { setData(d); setError(null); } })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [url]);
  return { data, loading, error };
}

// 7.3. Контекст темы
export const ThemeContext = createContext('light');

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={`theme-${theme}`}>
      <p>Текущая тема: {theme}</p>
      <button className="btn btn--primary" onClick={toggleTheme}>Переключить тему</button>
    </div>
  );
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
