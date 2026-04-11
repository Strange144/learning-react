import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  todos: [
    { id: nanoid(), text: 'Learn Redux Toolkit 🚀', completed: false, createdAt: Date.now() },
    { id: nanoid(), text: 'Build something awesome ✨', completed: true, createdAt: Date.now() - 100000 },
  ],
  filter: 'all', // 'all' | 'active' | 'completed'
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.todos.unshift(action.payload);
      },
      prepare: (text) => ({
        payload: {
          id: nanoid(),
          text,
          completed: false,
          createdAt: Date.now(),
        },
      }),
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, updateTodo, setFilter, clearCompleted } = todoSlice.actions;

// Selectors
export const selectAllTodos = (state) => state.todos.todos;
export const selectFilter = (state) => state.todos.filter;
export const selectFilteredTodos = (state) => {
  const todos = state.todos.todos;
  const filter = state.todos.filter;
  switch (filter) {
    case 'active':
      return todos.filter((t) => !t.completed);
    case 'completed':
      return todos.filter((t) => t.completed);
    default:
      return todos;
  }
};
export const selectTodoStats = (state) => {
  const todos = state.todos.todos;
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { total, completed, active, percent };
};

export default todoSlice.reducer;
