import { useState } from "react";

import "./Column.scss";

export type TicketType = {
  name: string;
  index: number;
  columnIndex: number;
};

export type ColumnType = {
  name: string;
  tickets: TicketType[];
};

export type CurrentColumnType = {
  name: string;
  tickets: TicketType[];
  index: number;
};

interface StandardComponentProps {
  columnValue: ColumnType;
  columns: ColumnType[];
  columnIndex: number;
  currentColumn: CurrentColumnType | null;
  setCurrentColumn: (column: CurrentColumnType) => void;
  setColumns: (columns: ColumnType[]) => void;
}

export const Column = ({
  columnValue,
  columns,
  columnIndex,
  currentColumn,
  setCurrentColumn,
  setColumns,
}: StandardComponentProps) => {
  const [ticketName, setTicketName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<TicketType | null>(null);

  const addNewTicket = () => {
    const tempArray = [...columns];
    const newTicketValue = {
      name: ticketName,
      index: tempArray[columnIndex].tickets.length,
      columnIndex,
    };

    tempArray[columnIndex].tickets.push(newTicketValue);
    setColumns(tempArray);
    setTicketName("");
    setIsAdding(false);
  };

  const deleteTicket = (index: number) => {
    const tempArray = [...columns];
    tempArray[columnIndex].tickets.splice(index, 1);
    setColumns(tempArray);
  };

  const deleteColumn = () => {
    const tempArray = [...columns];
    tempArray.splice(columnIndex, 1);
    setColumns(tempArray);
  };

  const dragStartHandler = (columnValue: ColumnType, index: number) => {
    setCurrentColumn({ ...columnValue, index });
  };

  const dropHandler = (e: any, columnValue: ColumnType) => {
    if (currentColumn != null) {
      e.preventDefault();
      const tempArray = [...columns];
      tempArray.splice(currentColumn.index, 1);
      const indexNewColumn = columns.indexOf(columnValue);
      tempArray.splice(indexNewColumn, 0, currentColumn);
      setColumns(tempArray);
      e.target.style.background = "#f0f0f0";
    }
  };

  const dropOverHandler = (e: any) => {
    e.preventDefault();
    e.target.style.background = "grey";
  };

  const dragEndHandler = (e: any, isWhite = false) => {
    e.target.style.background = isWhite ? "white" : "#f0f0f0";
  };

  const dragStartHandlerTicket = (ticketValue: TicketType) => {
    setCurrentTicket(ticketValue);
  };

  const dropHandlerTicket = (e: any, ticketValue: TicketType) => {
    if (currentTicket != null) {
      e.preventDefault();
      const tempArray = [...columns];
      tempArray[currentTicket.columnIndex].tickets.splice(
        currentTicket.index,
        1
      );
      const indexNewColumn = columns[columnIndex].tickets.indexOf(ticketValue);
      tempArray[columnIndex].tickets.splice(indexNewColumn, 0, currentTicket);
      setColumns(tempArray);
      e.target.style.background = "white";
    }
  };

  return (
    <div className="column">
      <div
        className="column__header"
        draggable
        onDragStart={() => dragStartHandler(columnValue, columnIndex)}
        onDrop={(e) => dropHandler(e, columnValue)}
        onDragOver={dropOverHandler}
        onDragLeave={dragEndHandler}
        onDragEnd={dragEndHandler}
      >
        <p>{columnValue.name}</p>
        {isAdding ? (
          <>
            <input
              onChange={(e) => setTicketName(e.target.value)}
              value={ticketName}
            />
            <button onClick={addNewTicket}>Done</button>
          </>
        ) : (
          <button onClick={() => setIsAdding(true)}>Add Ticket</button>
        )}
        <button onClick={deleteColumn}>Delete Column</button>
      </div>
      <div className="column__body">
        {columnValue.tickets?.map((ticket, index) => (
          <div
            key={`${ticket.name}-${index}`}
            className="column__ticket"
            draggable
            onDragStart={() => dragStartHandlerTicket(ticket)}
            onDrop={(e) => dropHandlerTicket(e, ticket)}
            onDragOver={dropOverHandler}
            onDragLeave={(e) => dragEndHandler(e, true)}
            onDragEnd={(e) => dragEndHandler(e, true)}
          >
            <p>{ticket.name}</p>
            <button onClick={() => deleteTicket(index)}>Delete Ticket</button>
          </div>
        ))}
      </div>
    </div>
  );
};
