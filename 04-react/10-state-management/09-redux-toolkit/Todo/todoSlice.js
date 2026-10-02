import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: nanoid(),
    text: "Learn Redux Toolkit",
    completed: false,
  },
  {
    id: nanoid(),
    text: "Practice createSlice",
    completed: false,
  },
  {
    id: nanoid(),
    text: "Build a Todo List",
    completed: true,
  },
];

const todoSlice = createSlice({
  name: "todoList",
  initialState,

  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: nanoid(),
        text: action.payload,
        completed: false,
      });
    },

    editTodo: (state, action) => {
      const { id, text } = action.payload;

      const todo = state.find((todo) => todo.id === id);

      if (todo) {
        todo.text = text;
      }
    },

    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },

    toggleComplete: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const {
  addTodo,
  editTodo,
  deleteTodo,
  toggleComplete,
} = todoSlice.actions;

export default todoSlice.reducer;