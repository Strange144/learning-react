import { useSelector } from 'react-redux';
import { selectTodoStats } from '../features/todo/todoSlice';

function ProgressBar() {
  const { total, completed, percent } = useSelector(selectTodoStats);

  if (total === 0) return null;

  return (
    <div className="progress-section">
      <div className="progress-header">
        <span className="progress-label">
          {completed}/{total} completed
        </span>
        <span className="progress-percent">{percent}%</span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
