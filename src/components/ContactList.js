import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeContact, editContact } from '../redux/contactSlice';
import styled from 'styled-components';
import { FaPhone, FaEnvelope, FaTrash, FaEdit } from 'react-icons/fa';

const colors = ['#3498db', '#e74c3c', '#f39c12'];

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const ContactCard = styled.div`
  background: ${(props) => props.color};
  color: white;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
`;

const IconButton = styled.button`
  background: rgba(255, 255, 255, 0.3);
  border: none;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: white;
  padding: 10px;
  border-radius: 5px;
`;

const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SaveButton = styled.button`
  background: green;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
`;

const ContactList = () => {
  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState(null);
  const [editedContact, setEditedContact] = useState({ name: '', email: '', phone: '' });

  const handleEditClick = (contact) => {
    setEditingId(contact.id);
    setEditedContact(contact);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    dispatch(editContact(editedContact));
    setEditingId(null);
  };

  return (
    <List>
      {contacts.map((contact, index) => (
        <ContactCard key={contact.id} color={colors[index % colors.length]}>
          <ButtonContainer>
            <IconButton onClick={() => handleEditClick(contact)}>
              <FaEdit />
            </IconButton>
            <IconButton onClick={() => dispatch(removeContact(contact.id))}>
              <FaTrash />
            </IconButton>
          </ButtonContainer>

          {editingId === contact.id ? (
            <EditForm onSubmit={handleSaveEdit}>
              <Input
                type="text"
                value={editedContact.name}
                onChange={(e) => setEditedContact({ ...editedContact, name: e.target.value })}
              />
              <Input
                type="email"
                value={editedContact.email}
                onChange={(e) => setEditedContact({ ...editedContact, email: e.target.value })}
              />
              <Input
                type="tel"
                value={editedContact.phone}
                onChange={(e) => setEditedContact({ ...editedContact, phone: e.target.value })}
              />
              <SaveButton type="submit">Salvar</SaveButton>
            </EditForm>
          ) : (
            <>
              <h3>{contact.name}</h3>
              <ContactInfo>
                <FaPhone /> {contact.phone}
              </ContactInfo>
              <ContactInfo>
                <FaEnvelope /> {contact.email}
              </ContactInfo>
            </>
          )}
        </ContactCard>
      ))}
    </List>
  );
};

export default ContactList;
