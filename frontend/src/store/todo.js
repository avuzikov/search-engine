import { createSlice } from "@reduxjs/toolkit";

const initialTodoState = {
  tasks: [],
};

//example element: { id: "1", value: "Example work task", type: "work" }

const todoSlice = createSlice({
  name: "todo",
  initialState: initialTodoState,
  reducers: {
    addElement(state, action) {
      state.tasks = [action.payload, ...state.tasks];
    },
    initialize(state, action) {
      state.tasks = action.payload;
    },
    removeElement(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;
