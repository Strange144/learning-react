import { useSelector } from 'react-redux';
import { selectFilteredTodos } from '../features/todo/todoSlice';
import TodoItem from './TodoItem';

function TodoList() {
  const todos = useSelector(selectFilteredTodos);

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="15" y="10" width="50" height="60" rx="6" />
            <line x1="25" y1="25" x2="55" y2="25" opacity="0.3" />
            <line x1="25" y1="35" x2="50" y2="35" opacity="0.3" />
            <line x1="25" y1="45" x2="45" y2="45" opacity="0.3" />
            <line x1="25" y1="55" x2="40" y2="55" opacity="0.3" />
          </svg>
        </div>
        <p className="empty-text">No tasks here yet</p>
        <p className="empty-subtext">Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <ul className="todo-list" id="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
