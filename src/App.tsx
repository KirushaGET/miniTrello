import { useState } from "react";
import {
  Column,
  type ColumnType,
  type CurrentColumnType,
} from "./components/Column/index";
import "./App.scss";

const App = () => {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [newColumnName, setNewColumnName] = useState("");
  const [currentColumn, setCurrentColumn] = useState<CurrentColumnType | null>(
    null
  );

  const newColumn = () => {
    const newColumnValue = {
      name: newColumnName,
      tickets: [],
    };

    setColumns((prev) => [...prev, newColumnValue]);
    setNewColumnName("");
  };

  return (
    <div className="app">
      <div className="app__header">
        <p>Please enter the name of new column</p>
        <input
          onChange={(e) => setNewColumnName(e.target.value)}
          value={newColumnName}
          className="app_input-header-column"
        />
        <button onClick={newColumn}>Add column</button>
      </div>
      <div className="app__body">
        {columns.map((column, index: number) => (
          <div key={`${column.name}-${index}`}>
            <Column
              columnValue={column}
              columnIndex={index}
              columns={columns}
              setColumns={setColumns}
              currentColumn={currentColumn}
              setCurrentColumn={setCurrentColumn}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
