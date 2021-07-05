import React, { useState } from 'react';

const Column = ({column, allTasks, setAllTasks, columnIndex}) => {
  const [ticketName, setTicketName] = useState("");

  const addNewTicket = () => {
    const tempArray = [...allTasks];
    const newTicketValue = {
      name: ticketName,
    };

    tempArray[columnIndex].data.push(newTicketValue);
    setAllTasks(tempArray);
    setTicketName("");
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
        <button onClick={() => deleteColumn()}>Delete Column</button>
        <input onChange={(e) => setTicketName(e.target.value)} value={ticketName}/>
        <button onClick={() => addNewTicket()}>Add Ticket</button>
      </div>
      <div  className="column__body">
        {
          column.data?.map((ticket, index) => (
            <div key={`${ticket}-${index}`}>
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
