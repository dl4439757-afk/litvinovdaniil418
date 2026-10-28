import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import ContactSuccess from './pages/ContactSuccess';
import NotFound from './pages/NotFound';

// Пример защищенного маршрута
function ProtectedRoute({ children }) {
  const isAuth = false; // в реальном приложении — из контекста/токена
  if (!isAuth) return <div className="page"><h2>Доступ запрещен — нужна авторизация</h2></div>;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <NavLink to="/" className="nav__brand">Магазин</NavLink>
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/products">Товары</NavLink>
        <NavLink to="/contact">Контакты</NavLink>
        <NavLink to="/about">О нас</NavLink>
        <NavLink to="/admin">Админка (защищено)</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact-success" element={<ContactSuccess />} />
        <Route path="/admin" element={<ProtectedRoute><h2 className="page">Админ-панель</h2></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
