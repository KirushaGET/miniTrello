import React, { useState } from 'react';
import './Column.scss';

const Column = ({column, allTasks, setAllTasks, columnIndex}) => {
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

  return (
    <div className="column">
      <div  className="column__header">
        <p>{column.name}</p>
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
          column.data?.map((ticket, index) => (
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
