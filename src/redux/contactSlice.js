import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
    editContact: (state, action) => {
      const index = state.contacts.findIndex(
        (contact) => contact.id === action.payload.id
      );
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
  },
});

export const { addContact, removeContact, editContact } = contactSlice.actions;
export default contactSlice.reducer;
