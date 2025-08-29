import React from 'react';
import TaskList from './components/TaskList';
import './App.css'; // Make sure the CSS file is imported

function App() {
  return (

    <div className="App">

      {/* The header section for the main title. */}
      <header className="App-header">
        <h1>Task Manager</h1>
      </header>

      {/* The <main> tag is good practice for semantic HTML.
          It holds the primary content of the page. */}
      <main>
        <TaskList />
      </main>
      
    </div>
  );
}

export default App;