import { useState } from "react";
import { Column, type ColumnType } from "../Column";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  MouseSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import "./Columns.scss";

type ColumnsProps = {
  columns: ColumnType[];
  setColumns: (columns: ColumnType[]) => void;
};

export const Columns = ({ columns, setColumns }: ColumnsProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const activeColumn = columns.find((column) => column.id === activeId);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = columns.findIndex((item) => item.id === active.id);
      const newIndex = columns.findIndex((item) => item.id === over.id);
      const newColumnsOrder = arrayMove(columns, oldIndex, newIndex);

      setColumns(newColumnsOrder);
    }
  };

  return (
    <div className="columns__container">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <SortableContext items={columns} strategy={rectSortingStrategy}>
          {columns.map((column, index) => (
            <Column
              key={column.id}
              currentColumnIndex={index}
              columns={columns}
              currentColumn={column}
              setColumns={setColumns}
            />
          ))}
          <DragOverlay>
            {activeColumn != null && (
              <Column
                columns={columns}
                currentColumnIndex={0}
                currentColumn={activeColumn}
                setColumns={setColumns}
              />
            )}
          </DragOverlay>
        </SortableContext>
      </DndContext>
    </div>
  );
};
