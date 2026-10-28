import React from 'react';
import UserRegistrationForm from './UserRegistrationForm';
import UserRegistrationFormWithValidation from './UserRegistrationFormWithValidation';
import ContactFormUncontrolled from './ContactFormUncontrolled';

function App() {
  return (
    <div className="app">
      <h1>ПР17: Работа с формами в React</h1>
      <UserRegistrationForm />
      <UserRegistrationFormWithValidation />
      <ContactFormUncontrolled />
    </div>
  );
}

export default App;
