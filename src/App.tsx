import { useState, type KeyboardEvent } from "react";
import { v4 as uuidv4 } from "uuid";

import { Columns } from "./components/Columns";
import { type ColumnType } from "./components/Column";
import "./App.scss";

const App = () => {
  const [columns, setColumns] = useState<ColumnType[]>([
    {
      id: "123321",
      name: "test",
      tasks: [
        { name: "123", id: "1" },
        { name: "222", id: "12" },
      ],
    },
    {
      id: "123",
      name: "test2",
      tasks: [
        { name: "1234", id: "123" },
        { name: "2225", id: "1234" },
      ],
    },
  ]);
  const [newColumnName, setNewColumnName] = useState("");

  const newColumn = () => {
    if (newColumnName?.length > 0) {
      const newColumnValue = {
        id: uuidv4(),
        name: newColumnName,
        tasks: [],
      };
      setColumns((prev) => [...prev, newColumnValue]);
      setNewColumnName("");
    }
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
        <Columns columns={columns} setColumns={setColumns} />
      </div>
    </div>
  );
};

export default App;
