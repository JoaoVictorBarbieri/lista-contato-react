import { createSlice } from '@reduxjs/toolkit';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
  },
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
    editContact: (state, action) => {
      const { id, name, email, phone } = action.payload;
      const contactIndex = state.contacts.findIndex(contact => contact.id === id);
      if (contactIndex !== -1) {
        state.contacts[contactIndex] = { id, name, email, phone };
      }
    }
  }
});

export const { addContact, removeContact, editContact } = contactSlice.actions;
export default contactSlice.reducer;
