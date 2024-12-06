import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLead: null,
};

export const leadSlice = createSlice({
  name: "lead",
  initialState,
  reducers: {
    setLeadDetail: (state, action) => {
      state.selectedLead = action.payload;
    },
  },
});

export const { setLeadDetail } = leadSlice.actions;

export default leadSlice.reducer;
