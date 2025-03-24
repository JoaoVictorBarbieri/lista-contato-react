import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeContact } from '../redux/contactSlice';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ContactItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f4f4f4;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
`;

const ContactList = () => {
  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();

  return (
    <List>
      {contacts.map((contact) => (
        <ContactItem key={contact.id}>
          <span>{contact.name} - {contact.email} - {contact.phone}</span>
          <button onClick={() => dispatch(removeContact(contact.id))}>Remover</button>
        </ContactItem>
      ))}
    </List>
  );
};

export default ContactList;
