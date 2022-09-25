import { useState } from 'react';
import Column from './components/Column/index';
import './App.scss';

export interface AllTasksParams {
  name: String;
  data: Array<{ name: String } | Object>;
}

export interface CurrentTicketObject {
  value: { name: String } | {};
  index: number;
  columnIndex: number;
}

export interface CurrentColumnObject {
  value: AllTasksParams;
  index: number;
}

const App = () => {
  const [allTasks, setAllTasks] = useState<Array<AllTasksParams>>([]);
  const [columnName, setColumnName] = useState('');
  const [currentColumn, setCurrentColumn] = useState<CurrentColumnObject>(Object);
  const [currentTicket, setCurrentTicket] = useState<CurrentTicketObject>(Object);

  const newColumn = () => {
    const newColumnValue = {
      name: columnName,
      data: []
    };

    setAllTasks((prev: Array<AllTasksParams>) => [...prev, newColumnValue]);
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
        <button onClick={newColumn}>Add column</button>
      </div>
      <div className="app__body">
        {allTasks.map((column: AllTasksParams, index: number) => (
          <div
            key={`${column.name}-${index}`}
          >
            <Column
              columnValue={column}
              columnIndex={index}
              allTasks={allTasks}
              setAllTasks={setAllTasks}
              currentColumn={currentColumn}
              setCurrentColumn={setCurrentColumn}
              currentTicket={currentTicket}
              setCurrentTicket={setCurrentTicket}
            />
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default App;
