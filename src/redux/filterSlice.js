import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    phoneFilter: {
      reducer(state, action) {
        state.name = action.payload;
      },
    },
  },
});

export const selectFilters = (state) => state.filters.name;
export const { phoneFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
