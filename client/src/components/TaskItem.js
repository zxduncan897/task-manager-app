import React from 'react';

function TaskItem({ task, deleteTask, toggleComplete }) {
  // Use a template literal to conditionally add the 'completed' class
  const itemClassName = `task-item ${task.completed ? 'completed' : ''}`;

  return (
    // Use an <li> for list items
    <li className={itemClassName}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task)}
      />
      <div className="task-content">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <button onClick={() => deleteTask(task._id)} className="delete-btn">Delete</button>
    </li>
  );
}

export default TaskItem;