import React, { useState } from 'react';
import './Column.scss';

const Column = ({columnValue, allTasks, setAllTasks, columnIndex, currentColumn, setCurrentColumn}) => {
  const [ticketName, setTicketName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const addNewTicket = () => {
    const tempArray = [...allTasks];
    const newTicketValue = {
      name: ticketName,
    };

    tempArray[columnIndex].data.push(newTicketValue);
    setAllTasks(tempArray);
    setTicketName("");
    setIsAdding(false);
  } 

  const deleteTicket = (index) => {
    const tempArray = [...allTasks];
    tempArray[columnIndex].data.splice(index, 1);
    setAllTasks(tempArray);
  }

  const deleteColumn = () => {
    const tempArray = [...allTasks];
    tempArray.splice(columnIndex, 1);
    setAllTasks(tempArray);
  }

  
  const dragStartHandler = (e, columnValue, index) => {
    setCurrentColumn({value: columnValue, index});
  }

  const dropHandler = (e, columnValue) => {
    e.preventDefault();
    const tempArray = [...allTasks];
    tempArray.splice(currentColumn.index, 1);
    const indexNewColumn = allTasks.indexOf(columnValue);
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
    <div className="column">
      <div 
        className="column__header"
        draggable
        onDragStart={(e) => dragStartHandler(e, columnValue, columnIndex)}
        onDrop={(e) => dropHandler(e, columnValue)}
        onDragOver={(e) => dropOverHandler(e)}
        onDragLeave={(e) => dragEndHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
      >
        <p>{columnValue.name}</p>
        {isAdding   
          ? <>
            <input onChange={(e) => setTicketName(e.target.value)} value={ticketName}/>
            <button onClick={() => addNewTicket()}>
              Done
            </button>
          </>
          : <button onClick={() => setIsAdding(true)}>
              Add Ticket
            </button>
        }
        <button onClick={() => deleteColumn()}>Delete Column</button>
      </div>
      <div  className="column__body">
        {
          columnValue.data?.map((ticket, index) => (
            <div key={`${ticket}-${index}`} className="column__ticket">
              <p>{ticket.name}</p>
              <button onClick={() => deleteTicket(index)}>Delete Ticket</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Column;
