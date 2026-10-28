import React, { Component } from 'react';

// 5.1. Секундомер
export class Timer extends Component {
  state = { seconds: 0, running: false };
  componentDidMount() { this.start(); }
  componentWillUnmount() { clearInterval(this.interval); }
  start = () => {
    if (this.state.running) return;
    this.interval = setInterval(() => this.setState(s => ({ seconds: s.seconds + 1 })), 1000);
    this.setState({ running: true });
  };
  stop = () => { clearInterval(this.interval); this.setState({ running: false }); };
  reset = () => { clearInterval(this.interval); this.setState({ seconds: 0, running: false }); };
  render() {
    return (
      <div className="card">
        <h3>Таймер: {this.state.seconds} сек</h3>
        <button className="btn btn--primary" onClick={this.start}>Старт</button>
        <button className="btn btn--secondary" onClick={this.stop}>Стоп</button>
        <button className="btn btn--secondary" onClick={this.reset}>Сброс</button>
      </div>
    );
  }
}

// 5.2. Отслеживание размера окна
export class WindowSizeTracker extends Component {
  state = { width: window.innerWidth, height: window.innerHeight };
  handleResize = () => this.setState({ width: window.innerWidth, height: window.innerHeight });
  componentDidMount() { window.addEventListener('resize', this.handleResize); }
  componentWillUnmount() { window.removeEventListener('resize', this.handleResize); }
  render() {
    return (
      <div className="card">
        <h3>Размер окна</h3>
        <p>{this.state.width} × {this.state.height}</p>
      </div>
    );
  }
}

// 5.3. Загрузка данных
export class DataFetcher extends Component {
  state = { data: null, loading: true };
  fetchData = async () => {
    this.setState({ loading: true });
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users/' + (this.props.userId || 1));
      const data = await res.json();
      this.setState({ data, loading: false });
    } catch (err) {
      this.setState({ data: null, loading: false });
    }
  };
  componentDidMount() { this.fetchData(); }
  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) this.fetchData();
  }
  render() {
    const { data, loading } = this.state;
    if (loading) return <div className="card"><p>Загрузка...</p></div>;
    return (
      <div className="card">
        <h3>Данные пользователя</h3>
        {data ? <p>{data.name} — {data.email}</p> : <p>Ошибка загрузки</p>}
      </div>
    );
  }
}
