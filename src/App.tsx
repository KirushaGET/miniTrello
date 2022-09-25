import { useState } from 'react';
import Column from './components/Column/index';
import './App.scss';

export interface allTasksParams {
  name: String;
  data: Array<{name: String} | Object>;
}

export interface currentTicketObject {
  value: {name: String} | {};
  index: number;
  columnIndex: number;
}

export interface currentColumnObject {
  value: allTasksParams;
  index: number;
}

const App = () => {
  const [allTasks, setAllTasks] = useState <Array<allTasksParams>>([]);
  const [columnName, setColumnName] = useState('');
  const [currentColumn, setCurrentColumn] = useState <currentColumnObject>(Object);
  const [currentTicket, setCurrentTicket] = useState <currentTicketObject>(Object);

  const newColumn = () => {
    const newColumnValue = {
      name: columnName,
      data: []
    };

    setAllTasks((prev: Array<allTasksParams>) => [...prev, newColumnValue]);
    setColumnName('');
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
        {allTasks.map((column: allTasksParams, index: number) => (
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
