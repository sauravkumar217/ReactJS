import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    setTasks([...tasks, newTask]);
    setNewTask('');
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="input-group">
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Add a new task"
          className="task-input"
        />
        <button onClick={handleAddTask} className="add-btn">Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;