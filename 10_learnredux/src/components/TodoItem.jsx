import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleTodo, updateTodo } from '../features/todo/todoSlice';

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isExiting, setIsExiting] = useState(false);
  const editRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing && editRef.current) {
      editRef.current.focus();
      editRef.current.select();
    }
  }, [isEditing]);

  const handleDelete = () => {
    setIsExiting(true);
    setTimeout(() => {
      dispatch(deleteTodo(todo.id));
    }, 300);
  };

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleEdit = () => {
    setEditText(todo.text);
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      dispatch(updateTodo({ id: todo.id, text: trimmed }));
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const timeAgo = getTimeAgo(todo.createdAt);

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} ${isExiting ? 'exit' : ''}`}>
      {/* Custom checkbox */}
      <button
        className={`checkbox ${todo.completed ? 'checked' : ''}`}
        onClick={handleToggle}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        id={`toggle-${todo.id}`}
      >
        {todo.completed && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="todo-content">
        {isEditing ? (
          <input
            ref={editRef}
            className="edit-input"
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            maxLength={120}
            id={`edit-${todo.id}`}
          />
        ) : (
          <>
            <span className="todo-text" onDoubleClick={handleEdit}>
              {todo.text}
            </span>
            <span className="todo-time">{timeAgo}</span>
          </>
        )}
      </div>

      {/* Action Buttons */}
      {!isEditing && (
        <div className="todo-actions">
          <button className="action-btn edit-btn" onClick={handleEdit} aria-label="Edit todo" id={`edit-btn-${todo.id}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button className="action-btn delete-btn" onClick={handleDelete} aria-label="Delete todo" id={`delete-btn-${todo.id}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      )}
    </li>
  );
}

function getTimeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default TodoItem;
