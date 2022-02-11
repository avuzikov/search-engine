import { createSlice } from "@reduxjs/toolkit";

const initialHistoryState = {
  requests: [],
};

//example element: { id: "1", value: "You know nothing John Snow", type: "quote" }

const historySlice = createSlice({
  name: "history",
  initialState: initialHistoryState,
  reducers: {
    addElement(state, action) {
      state.requests = [action.payload, ...state.requests];
    },
    initialize(state, action) {
      state.requests = action.payload;
    },
    removeElement(state, action) {
      state.requests = state.requests.filter(
        (request) => request.id !== action.payload
      );
    },
  },
});

export const historyActions = historySlice.actions;

export default historySlice.reducer;
