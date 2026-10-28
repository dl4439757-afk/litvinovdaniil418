import React, { Component } from 'react';

// 3.1. Счетчик
export class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  increment = () => this.setState({ count: this.state.count + 1 });
  decrement = () => this.setState({ count: this.state.count - 1 });
  render() {
    return (
      <div className="card">
        <h3>Счетчик: {this.state.count}</h3>
        <button className="btn btn--primary" onClick={this.increment}>+1</button>
        <button className="btn btn--secondary" onClick={this.decrement}>-1</button>
      </div>
    );
  }
}

// 3.2. Форма входа
export class LoginForm extends Component {
  state = { email: '', password: '', error: '' };
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.email.includes('@')) this.setState({ error: 'Некорректный email' });
    else if (this.state.password.length < 6) this.setState({ error: 'Пароль минимум 6 символов' });
    else this.setState({ error: '' });
  };
  render() {
    return (
      <form className="card" onSubmit={this.handleSubmit}>
        <h3>Вход</h3>
        <input type="email" placeholder="Email" value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })} />
        <input type="password" placeholder="Пароль" value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })} />
        {this.state.error && <p className="error">{this.state.error}</p>}
        <button className="btn btn--primary" type="submit">Войти</button>
      </form>
    );
  }
}

// 3.3. Выбор цвета
export class ColorPicker extends Component {
  colors = ['#E74C3C', '#3498DB', '#27AE60', '#F39C12'];
  state = { selected: null };
  render() {
    return (
      <div className="card">
        <h3>Выбор цвета</h3>
        {this.colors.map(c => (
          <button key={c} style={{ background: c, width: '30px', height: '30px', marginRight: '5px' }}
            onClick={() => this.setState({ selected: c })} />
        ))}
        {this.state.selected && <p>Выбран: <strong style={{ color: this.state.selected }}>{this.state.selected}</strong></p>}
      </div>
    );
  }
}

// 4.1. Список задач
export class TodoList extends Component {
  state = { todos: [], input: '' };
  addTodo = () => {
    if (!this.state.input.trim()) return;
    this.setState(s => ({ todos: [...s.todos, { text: s.input, done: false }], input: '' }));
  };
  toggleTodo = (i) => {
    this.setState(s => ({
      todos: s.todos.map((t, idx) => idx === i ? { ...t, done: !t.done } : t)
    }));
  };
  removeTodo = (i) => {
    this.setState(s => ({ todos: s.todos.filter((_, idx) => idx !== i) }));
  };
  render() {
    return (
      <div className="card">
        <h3>Список задач</h3>
        <input type="text" placeholder="Новая задача" value={this.state.input}
          onChange={e => this.setState({ input: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && this.addTodo()} />
        <button className="btn btn--primary" onClick={this.addTodo}>Добавить</button>
        <ul>
          {this.state.todos.map((t, i) => (
            <li key={i}>
              <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span>{' '}
              <button className="btn btn--secondary btn--small" onClick={() => this.toggleTodo(i)}>✓</button>
              <button className="btn btn--secondary btn--small" onClick={() => this.removeTodo(i)}>✕</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// 4.2. Поиск
export class SearchBox extends Component {
  state = { query: '', results: [] };
  items = ['Яблоко', 'Банан', 'Апельсин', 'Груша', 'Персик', 'Виноград'];
  handleSearch = (e) => {
    const query = e.target.value;
    this.setState({
      query,
      results: query ? this.items.filter(i => i.toLowerCase().includes(query.toLowerCase())) : []
    });
  };
  clear = () => this.setState({ query: '', results: [] });
  render() {
    return (
      <div className="card">
        <h3>Поиск</h3>
        <input type="text" placeholder="Поиск фрукта..." value={this.state.query}
          onChange={this.handleSearch} />
        <button className="btn btn--secondary" onClick={this.clear}>Очистить</button>
        <ul>{this.state.results.map((r, i) => <li key={i}>{r}</li>)}</ul>
      </div>
    );
  }
}
