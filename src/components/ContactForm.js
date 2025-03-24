import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/contactSlice';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContactForm = () => {
  const dispatch = useDispatch();
  const [contact, setContact] = useState({
    id: Date.now(),
    name: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContact(contact));
    setContact({ id: Date.now(), name: '', email: '', phone: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome Completo"
        value={contact.name}
        onChange={(e) => setContact({ ...contact, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="E-mail"
        value={contact.email}
        onChange={(e) => setContact({ ...contact, email: e.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Telefone"
        value={contact.phone}
        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        required
      />
      <button type="submit">Adicionar Contato</button>
    </Form>
  );
};

export default ContactForm;
