import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import ProgressBar from './components/ProgressBar';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* Background decorations */}
      <div className="bg-gradient" />
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />

      <main className="container">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 32 32" fill="none">
                <rect x="3" y="3" width="26" height="26" rx="8" stroke="currentColor" strokeWidth="2" />
                <path d="M10 16l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1>TaskFlow</h1>
          </div>
          <p className="subtitle">Organize your day, one task at a time</p>
        </header>

        {/* Progress */}
        <ProgressBar />

        {/* Input */}
        <TodoInput />

        {/* Filters */}
        <TodoFilters />

        {/* List */}
        <TodoList />

        {/* Footer */}
        <footer className="footer">
          <p>Built with <span className="heart">❤</span> using React & Redux Toolkit</p>
          <p className="hint">💡 Double-click a task to edit it</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
