import { useState, useEffect, useCallback, useRef } from 'react';

// useLocalStorage: синхронизация с localStorage
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch { return initialValue; }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

// useFetch: асинхронная загрузка с отменой
export function useFetch(url) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });
    fetch(url, { signal: controller.signal })
      .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(data => setState({ data, loading: false, error: null }))
      .catch(e => { if (e.name !== 'AbortError') setState(s => ({ ...s, loading: false, error: e.message })); });
    return () => controller.abort(); // отмена запроса при размонтировании
  }, [url]);
  return state;
}

// useDebounce: отложенное значение
export function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

// useWindowSize: размер окна
export function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return size;
}

// usePrevious: предыдущее значение
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => { ref.current = value; }, [value]);
  return ref.current;
}

// useToggle: переключатель boolean
export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}

// Демо-компоненты для кастомных хуков
export function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('pr16-name', '');
  return (
    <div className="card">
      <h3>useLocalStorage</h3>
      <input type="text" placeholder="Сохраняется автоматически" value={name} onChange={e => setName(e.target.value)} />
      <p>Значение: {name}</p>
    </div>
  );
}

export function FetchDemo() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts/1');
  return (
    <div className="card">
      <h3>useFetch</h3>
      {loading && <p>Загрузка...</p>}
      {error && <p className="error">Ошибка: {error}</p>}
      {data && <p><strong>{data.title}</strong></p>}
    </div>
  );
}

export function DebounceDemo() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  return (
    <div className="card">
      <h3>useDebounce</h3>
      <input type="text" placeholder="Поиск (500ms)" value={query} onChange={e => setQuery(e.target.value)} />
      <p>Введено: {query} | Отправляется: {debouncedQuery}</p>
    </div>
  );
}

export function WindowSizeDemo() {
  const { width, height } = useWindowSize();
  return <div className="card"><h3>useWindowSize: {width} × {height}</h3></div>;
}

export function PreviousDemo() {
  const [count, setCount] = useState(0);
  const prev = usePrevious(count);
  return (
    <div className="card">
      <h3>usePrevious</h3>
      <p>Сейчас: {count}, было: {prev ?? '—'}</p>
      <button className="btn btn--primary" onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}

export function ToggleDemo() {
  const [on, toggle] = useToggle(false);
  return (
    <div className="card">
      <h3>useToggle</h3>
      <p>Состояние: {on ? 'ВКЛ' : 'ВЫКЛ'}</p>
      <button className="btn btn--primary" onClick={toggle}>Переключить</button>
    </div>
  );
}
