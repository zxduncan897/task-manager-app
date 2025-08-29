import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

const API_URL = 'https://task-manager-app-askn.onrender.com';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setTasks(response.data);
    });
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    axios.post(API_URL, { title, description }).then((response) => {
      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
    });
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
        setTasks(tasks.filter(task => task._id !== id));
    });
  };

  const toggleComplete = (task) => {
    axios.put(`${API_URL}/${task._id}`, { ...task, completed: !task.completed })
        .then(response => {
            setTasks(tasks.map(t => (t._id === task._id ? response.data : t)));
        });
  };
 return (
    <div>
      {/* Add className to the form */}
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
        />
        <button type="submit">Add Task</button>
      </form>
      
      {/* Use a <ul> for the list for better semantics */}
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} deleteTask={deleteTask} toggleComplete={toggleComplete} />
        ))}
      </ul>
    </div>
  );
}


export default TaskList;