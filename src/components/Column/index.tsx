import { useState, type KeyboardEvent } from "react";

import "./Column.scss";

export type TaskType = {
  name: string;
};

export type ColumnType = {
  name: string;
  tasks: TaskType[];
};

interface StandardComponentProps {
  columns: ColumnType[];
  currentColumn: ColumnType;
  currentColumnIndex: number;
  setColumns: (columns: ColumnType[]) => void;
}

export const Column = ({
  columns,
  currentColumn,
  currentColumnIndex,
  setColumns,
}: StandardComponentProps) => {
  const [taskName, setTaskName] = useState("");
  const [showAddTaskButton, setShowAddTaskButton] = useState(false);

  const addNewTaskHandler = () => {
    const columnsCopy: ColumnType[] = JSON.parse(JSON.stringify(columns));
    columnsCopy[currentColumnIndex].tasks.push({
      name: taskName,
    });
    setColumns(columnsCopy);
    setTaskName("");
    setShowAddTaskButton(false);
  };

  const submitOnEnter = (
    e: KeyboardEvent<HTMLInputElement>,
    callback: () => void
  ) => {
    if (e.key === "Enter") {
      callback();
    }
  };

  const deleteColumnHandler = (deleteIndex: number) => {
    const deletedColumnArray = columns.filter(
      (_column, index) => index !== deleteIndex
    );
    setColumns(deletedColumnArray);
  };

  const deleteTaskHandler = (deleteIndex: number, columnIndex: number) => {
    const deletedTaskArray = columns[columnIndex].tasks.filter(
      (_column, index) => index !== deleteIndex
    );
    const columnsCopy: ColumnType[] = JSON.parse(JSON.stringify(columns));
    columnsCopy[columnIndex].tasks = deletedTaskArray;
    setColumns(columnsCopy);
  };

  return (
    <div className="column">
      <div
        className="column__header"
      >
        <p>{currentColumn.name}</p>

        {showAddTaskButton ? (
          <div>
            <input
              onKeyDown={(e) => submitOnEnter(e, addNewTaskHandler)}
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <button onClick={addNewTaskHandler}>Done</button>
          </div>
        ) : (
          <button onClick={() => setShowAddTaskButton(true)}>Add Task</button>
        )}

        <button onClick={() => deleteColumnHandler(currentColumnIndex)}>
          Delete Column
        </button>
      </div>
      <div className="column__body">
        {currentColumn.tasks?.map((task, index) => (
          <div
            key={`${task.name}-${index}`}
            className="column__task"
          >
            <p>{task.name}</p>

            <button
              onClick={() => deleteTaskHandler(index, currentColumnIndex)}
            >
              Delete Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
