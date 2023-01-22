import { useState, type KeyboardEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import "./Column.scss";

export type TaskType = {
  id: string;
  name: string;
};

export type ColumnType = {
  id: string;
  name: string;
  tasks: TaskType[];
};

type ColumnProps = {
  columns: ColumnType[];
  currentColumn: ColumnType;
  currentColumnIndex: number;
  setColumns: (columns: ColumnType[]) => void;
};

type DraggableColumnWrapperProps = {
  id: string;
  children: React.ReactNode;
};

type DraggableTaskWrapperProps = {
  id: string;
  children: React.ReactNode;
};

const DraggableTaskWrapper = ({ id, children }: DraggableTaskWrapperProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      className="column__task"
      style={{
        transition,
        position: "relative",
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.3 : 1,
      }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

const DraggableColumnWrapper = ({
  id,
  children,
}: DraggableColumnWrapperProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      className="column"
      style={{
        transition,
        position: "relative",
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.3 : 1,
      }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

export const Column = ({
  columns,
  currentColumn,
  currentColumnIndex,
  setColumns,
}: ColumnProps) => {
  const [taskName, setTaskName] = useState("");
  const [showAddTaskButton, setShowAddTaskButton] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<TaskType[]>(currentColumn.tasks ?? []);
  const activeTask = tasks.find((task) => task.id === activeId);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addNewTaskHandler = () => {
    const columnsCopy: ColumnType[] = JSON.parse(JSON.stringify(columns));
    columnsCopy[currentColumnIndex].tasks.push({
      id: uuidv4(),
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

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);

    if (document.body?.style) {
      document.body.style.cursor = "grabbing";
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((item) => item.id === active.id);
      const newIndex = tasks.findIndex((item) => item.id === over.id);
      const newImagesOrder = arrayMove(tasks, oldIndex, newIndex);

      setTasks(newImagesOrder);

      if (document.body?.style) {
        document.body.style.cursor = "";
      }
    }
  };

  return (
    <DraggableColumnWrapper id={currentColumn.id}>
      <div className="column__header">
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
        {tasks.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            <SortableContext items={tasks} strategy={rectSortingStrategy}>
              {tasks.map((task, index) => (
                <DraggableTaskWrapper key={task.id} id={task.id}>
                  <p>{task.name}</p>

                  <button
                    onClick={() => deleteTaskHandler(index, currentColumnIndex)}
                  >
                    Delete Task
                  </button>
                </DraggableTaskWrapper>
              ))}

              <DragOverlay>
                {activeTask != null && (
                  <div key={activeTask.name} className="column__task">
                    <p>{activeTask.name}</p>
                  </div>
                )}
              </DragOverlay>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </DraggableColumnWrapper>
  );
};
