import React, { useState } from 'react';
import Column from './Component/Column/index.js';
import './App.scss';

const App = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [columnName, setColumnName] = useState("");
  const [currentColumn, setCurrentColumn] = useState({});
  const [currentTicket, setCurrentTicket] = useState({});

  const newColumn = () => {
    const newColumnValue = {
      name: columnName,
      data: []
    };

    setAllTasks((prev) => [...prev, newColumnValue]);
    setColumnName("");
  }

  return (
    <div className="app">
      <div className="app__header">
        <p>Please enter the name of new column</p>
        <input 
          onChange={(e) => setColumnName(e.target.value)} 
          value={columnName}
          className="app_input-header-column"
        />
        <button onClick={() => newColumn()}>Add column</button>
      </div>
      <div className="app__body">
        {allTasks.map((column, index) => (
          <div 
            key={`${column.name}-${index}`} 
          >
            <Column 
              columnValue={column} 
              columnIndex={index} 
              {...{
                allTasks, 
                setAllTasks, 
                currentColumn, 
                setCurrentColumn, 
                currentTicket, 
                setCurrentTicket
              }}
            />
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default App;
