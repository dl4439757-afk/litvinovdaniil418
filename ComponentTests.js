import React from 'react';
import { WelcomeMessage, UserCard, Button, Card, Toggle, ConditionalMessage } from './basic/BasicComponents';
import { Counter, LoginForm, ColorPicker, TodoList, SearchBox } from './stateful/StatefulComponents';
import { Timer, WindowSizeTracker, DataFetcher } from './lifecycle/LifecycleComponents';
import { CounterWithHooks, UserProfile, EffectDemo, useLocalStorage, ThemeProvider, ThemeToggle } from './hooks/HooksComponents';

function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('username', '');
  return (
    <div className="card">
      <h3>useLocalStorage демо</h3>
      <input type="text" placeholder="Имя сохранится в localStorage"
        value={name} onChange={e => setName(e.target.value)} />
      <p>Сохранено: {name}</p>
    </div>
  );
}

function FetchDemo() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos/1');
  return (
    <div className="card">
      <h3>useFetch демо</h3>
      {loading && <p>Загрузка...</p>}
      {error && <p className="error">Ошибка: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default function ComponentTests() {
  return (
    <div>
      <div className="section">
        <h2>Базовые компоненты</h2>
        <WelcomeMessage name="Даниил" age={20} />
        <UserCard user={{ name: 'Иван', email: 'ivan@mail.ru', avatar: 'https://i.pravatar.cc/50', isOnline: true }} />
        <Button variant="primary" onClick={() => alert('Клик!')}>Primary</Button>
        <Button variant="secondary" size="large">Secondary large</Button>
        <Card title="Карточка"><p>Содержимое через children</p></Card>
        <Toggle><p>Скрытый контент</p></Toggle>
        <ConditionalMessage status="success" />
      </div>

      <div className="section">
        <h2>Компоненты с состоянием</h2>
        <Counter />
        <LoginForm />
        <ColorPicker />
        <TodoList />
        <SearchBox />
      </div>

      <div className="section">
        <h2>Жизненный цикл</h2>
        <Timer />
        <WindowSizeTracker />
        <DataFetcher userId={1} />
      </div>

      <div className="section">
        <h2>Хуки</h2>
        <CounterWithHooks />
        <UserProfile />
        <LocalStorageDemo />
        <FetchDemo />
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      </div>
    </div>
  );
}
