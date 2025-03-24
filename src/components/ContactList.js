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
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 300px;
`;

const CardHeader = styled.div`
  background: ${(props) => props.color};
  padding: 15px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
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

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
`;

const EditContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const SaveButton = styled.button`
  background: green;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
  text-align: center;
`;

const CancelButton = styled.button`
  background: gray;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
  text-align: center;
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

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <List>
      {contacts.map((contact, index) => (
        <ContactCard key={contact.id} color={colors[index % colors.length]}>
          <CardHeader color={colors[index % colors.length]}>
            <h3>{contact.name}</h3>
            <ButtonContainer>
              <IconButton onClick={() => handleEditClick(contact)}>
                <FaEdit />
              </IconButton>
              <IconButton onClick={() => dispatch(removeContact(contact.id))}>
                <FaTrash />
              </IconButton>
            </ButtonContainer>
          </CardHeader>

          {editingId === contact.id ? (
            <EditContainer>
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

                <ButtonGroup>
                  <SaveButton type="submit">Salvar</SaveButton>
                  <CancelButton type="button" onClick={handleCancelEdit}>Cancelar</CancelButton>
                </ButtonGroup>
              </EditForm>
            </EditContainer>
          ) : (
            <>
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
