import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addContacts, deleteContacts, fetchContacts } from "./contactsOps";
import { selectFilters } from "./filterSlice";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(deleteContacts.pending, handlePending)
      .addCase(deleteContacts.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((item) => item.id !== payload.id);
        state.loading = false;
      })
      .addCase(deleteContacts.rejected, handleRejected)
      .addCase(addContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContacts.fulfilled, (state, { payload }) => {
        state.items.push(payload);
        state.loading = false;
      })
      .addCase(addContacts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilters],
  (contacts, findContacts) => {
    return contacts
      .filter((contact) =>
        contact.name.toLowerCase().includes(findContacts.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }
);

export const contactsReducer = contactsSlice.reducer;
