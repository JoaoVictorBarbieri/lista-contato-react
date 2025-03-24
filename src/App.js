import React from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

const App = () => {
  return (
    <div>
      <h1>Lista de Contatos</h1>
      <ContactForm />
      <ContactList />
    </div>
  );
};

export default App;
