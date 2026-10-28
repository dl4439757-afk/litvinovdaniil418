import React, { useRef } from 'react';

// Задание 3: неуправляемые компоненты через useRef
export default function ContactFormUncontrolled() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const resultRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // предотвращаем перезагрузку страницы
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value
    };
    console.log('Неуправляемая форма:', data);
    resultRef.current.textContent = `Отправлено! Имя: ${data.name}, Email: ${data.email}`;
    e.target.reset(); // очищаем через DOM
  };

  return (
    <div className="form-card">
      <h2>Задание 3: Форма обратной связи (useRef)</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Имя</label>
          <input type="text" ref={nameRef} defaultValue="" />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" ref={emailRef} defaultValue="" />
        </div>
        <div className="field">
          <label>Сообщение</label>
          <textarea ref={messageRef} defaultValue="" />
        </div>
        <button type="submit" className="btn">Отправить</button>
      </form>
      <p ref={resultRef} className="success"></p>
    </div>
  );
}
