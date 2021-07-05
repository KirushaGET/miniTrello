import React, { useState } from 'react';
import Column from './Component/Column/index.js';
import './App.scss';

const App = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [columnName, setColumnName] = useState("");
  const [currentColumn, setCurrentColumn] = useState({});

  const newColumn = () => {
    const newColumnValue = {
      name: columnName,
      data: []
    };

    setAllTasks((prev) => [...prev, newColumnValue]);
    setColumnName("");
  }

  const dragStartHandler = (e, column, index) => {
    setCurrentColumn({value: column, index});
  }

  const dropHandler = (e, column) => {
    e.preventDefault();
    const tempArray = [...allTasks];
    tempArray.splice(currentColumn.index, 1);
    const indexNewColumn = allTasks.indexOf(column);
    tempArray.splice(indexNewColumn, 0, currentColumn.value);
    setAllTasks(tempArray);
    e.target.style.background = '#f0f0f0';
  }

  const dropOverHandler = (e) => {
    e.preventDefault();
    e.target.style.background = 'grey';
  }

  const dragEndHandler = (e) => {
    e.target.style.background = '#f0f0f0';
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
            draggable
            onDragStart={(e) => dragStartHandler(e, column, index)}
            onDrop={(e) => dropHandler(e, column)}
            onDragOver={(e) => dropOverHandler(e)}
            onDragLeave={(e) => dragEndHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
          >
            <Column 
              column={column} 
              allTasks={allTasks} 
              setAllTasks={setAllTasks} 
              columnIndex={index} 
            />
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default App;
