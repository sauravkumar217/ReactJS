import React, { useState } from 'react';
import '../App.css';

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault(); // Prevents form submission refresh
    const trimmedTask = task.trim();

    if (!trimmedTask) {
      setError('Please enter a task.');
      return;
    }

    if (tasks.includes(trimmedTask)) {
      setError('This task already exists.');
      return;
    }

    setTasks([...tasks, trimmedTask]);
    setTask('');
    setError('');
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    setError('');
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <form onSubmit={handleAddTask} className="todo-form">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="todo-input"
        />
        <button type="submit" className="add-button">
          Add Task
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {tasks.length === 0 ? (
        <p className="empty-message">No tasks yet. Add one above!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className="task-item">
              <span>{task}</span>
              <button
                onClick={() => handleDeleteTask(index)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoApp;