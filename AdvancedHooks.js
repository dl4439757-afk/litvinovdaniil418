import React, { useState, useMemo, useCallback, useRef, useContext, createContext } from 'react';

// useMemo: тяжелые вычисления
export function MemoDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Пересчитывается только при изменении count
  const expensiveValue = useMemo(() => {
    console.log('Тяжелый расчет...');
    let result = 0;
    for (let i = 0; i < 1e6; i++) result += i * count;
    return result;
  }, [count]);

  return (
    <div className="card">
      <h3>useMemo</h3>
      <p>Результат: {expensiveValue}</p>
      <p>Count: {count}</p>
      <button className="btn btn--primary" onClick={() => setCount(c => c + 1)}>+1</button>
      <input type="text" placeholder="Этот ввод не вызывает пересчет" value={text} onChange={e => setText(e.target.value)} />
    </div>
  );
}

// useCallback + React.memo: стабильная ссылка на функцию
const Button = React.memo(function Button({ onClick, children }) {
  console.log('Рендер кнопки:', children);
  return <button className="btn btn--primary" onClick={onClick}>{children}</button>;
});

export function CallbackDemo() {
  const [count, setCount] = useState(0);
  // Без useCallback каждый рендер создавал бы новую функцию и Button перерендеривался бы
  const increment = useCallback(() => setCount(c => c + 1), []);
  return (
    <div className="card">
      <h3>useCallback + memo</h3>
      <p>Count: {count}</p>
      <Button onClick={increment}>+1</Button>
    </div>
  );
}

// useRef: доступ к DOM и сохранение значения без рендера
export function RefDemo() {
  const inputRef = useRef(null);
  const renderCount = useRef(0);
  const [text, setText] = useState('');
  renderCount.current++; // рендер счетчик не вызывает повторный рендер

  return (
    <div className="card">
      <h3>useRef</h3>
      <p>Рендеров: {renderCount.current}</p>
      <input ref={inputRef} type="text" value={text} onChange={e => setText(e.target.value)} />
      <button className="btn btn--primary" onClick={() => inputRef.current.focus()}>Фокус на поле</button>
    </div>
  );
}

// useContext: глобальное состояние без проп-дриллинга
const ThemeContext = createContext('light');
const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} });

function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return <button className="btn btn--primary" onClick={toggleTheme}>Тема: {theme}</button>;
}

function UserBadge() {
  const { user, login, logout } = useContext(AuthContext);
  return user
    ? <><span className="success">Вошел: {user}</span> <button className="btn btn--secondary" onClick={logout}>Выйти</button></>
    : <button className="btn btn--primary" onClick={() => login('Даниил')}>Войти</button>;
}

function Toolbar() {
  return (
    <div>
      <ThemedButton /> <UserBadge />
    </div>
  );
}

function Content() {
  const { theme } = useContext(ThemeContext);
  return <p style={{ marginTop: '10px' }}>Контент в теме «{theme}»</p>;
}

export function ContextDemo() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  return (
    <div className="card">
      <h3>useContext</h3>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <AuthContext.Provider value={{ user, login: setUser, logout: () => setUser(null) }}>
          <Toolbar />
          <Content />
        </AuthContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}
