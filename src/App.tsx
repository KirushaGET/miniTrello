import { useState, type KeyboardEvent } from "react";
import { Column, type ColumnType } from "./components/Column/index";
import "./App.scss";

const App = () => {
  const [columns, setColumns] = useState<ColumnType[]>([
    { name: "test", tasks: [{ name: "123" }, { name: "222" }] },
    { name: "test2", tasks: [{ name: "1234" }, { name: "2225" }] },
  ]);
  const [newColumnName, setNewColumnName] = useState("");

  const newColumn = () => {
    const newColumnValue = {
      name: newColumnName,
      tasks: [],
    };

    setColumns((prev) => [...prev, newColumnValue]);
    setNewColumnName("");
  };

  const submitOnEnter = (
    e: KeyboardEvent<HTMLInputElement>,
    callback: () => void
  ) => {
    if (e.key === "Enter") {
      callback();
    }
  };

  return (
    <div className="app">
      <div className="app__header">
        <p>Please enter the name of new column</p>
        <input
          onKeyDown={(e) => submitOnEnter(e, newColumn)}
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
              currentColumnIndex={index}
              columns={columns}
              currentColumn={column}
              setColumns={setColumns}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
