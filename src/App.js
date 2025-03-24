import React from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import styled from 'styled-components';

const Container = styled.div`
  background: #dff6ff;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #007bff;
  font-size: 24px;
  margin-bottom: 20px;
`;

const App = () => {
  return (
    <Container>
      <Title>Lista de Contatos</Title>
      <ContactForm />
      <ContactList />
    </Container>
  );
};

export default App;
