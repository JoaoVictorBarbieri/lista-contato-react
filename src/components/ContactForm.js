import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/contactSlice';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const applyPhoneMask = (value) => {
  // Remove todos os caracteres não numéricos
  const numbers = value.replace(/\D/g, '');
  
  // Aplica a máscara conforme o usuário digita
  let maskedValue = numbers;
  if (numbers.length > 0) {
    maskedValue = `(${numbers.slice(0, 2)}`;
    if (numbers.length > 2) {
      maskedValue += `) ${numbers.slice(2, 3)}`;
      if (numbers.length > 3) {
        maskedValue += ` ${numbers.slice(3, 7)}`;
        if (numbers.length > 7) {
          maskedValue += `-${numbers.slice(7, 11)}`;
        }
      }
    }
  }
  
  return maskedValue;
};

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
      <Input
        type="text"
        placeholder="Nome Completo"
        value={contact.name}
        onChange={(e) => setContact({ ...contact, name: e.target.value })}
        required
      />
      <Input
        type="email"
        placeholder="E-mail"
        value={contact.email}
        onChange={(e) => setContact({ ...contact, email: e.target.value })}
        required
      />
      <Input
        type="tel"
        placeholder="Telefone"
        value={contact.phone}
        onChange={(e) => {
          const maskedValue = applyPhoneMask(e.target.value);
          setContact({ ...contact, phone: maskedValue });
        }}
        maxLength={17} // (xx) x xxxx-xxxx = 17 caracteres
        required
      />
      <Button type="submit">Adicionar Contato</Button>
    </Form>
  );
};

export default ContactForm;
