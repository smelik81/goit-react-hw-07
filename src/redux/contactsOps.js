import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = apiUrl;

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContacts = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const addContacts = createAsyncThunk(
  "contacts/addedContacts",
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post(`/contacts`, contact);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
