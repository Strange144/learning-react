import { useSelector, useDispatch } from 'react-redux';
import { setFilter, clearCompleted, selectFilter, selectTodoStats } from '../features/todo/todoSlice';

function TodoFilters() {
  const filter = useSelector(selectFilter);
  const stats = useSelector(selectTodoStats);
  const dispatch = useDispatch();

  const filters = [
    { key: 'all', label: 'All', count: stats.total },
    { key: 'active', label: 'Active', count: stats.active },
    { key: 'completed', label: 'Done', count: stats.completed },
  ];

  return (
    <div className="todo-filters">
      <div className="filter-tabs">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`filter-btn ${filter === f.key ? 'active' : ''}`}
            onClick={() => dispatch(setFilter(f.key))}
            id={`filter-${f.key}`}
          >
            {f.label}
            <span className="filter-count">{f.count}</span>
          </button>
        ))}
      </div>
      {stats.completed > 0 && (
        <button
          className="clear-btn"
          onClick={() => dispatch(clearCompleted())}
          id="clear-completed-btn"
        >
          Clear done
        </button>
      )}
    </div>
  );
}

export default TodoFilters;
