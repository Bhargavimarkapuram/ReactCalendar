import React, { useState } from "react";
import Calendar from "./components/Calendar";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const deleteEvent = (eventToDelete) => {
    setEvents((prevEvents) => prevEvents.filter(event => event.id !== eventToDelete.id));
  };
  
  return (
    <div className="app">
      <h1>React Calendar</h1>
      <Calendar events={events} addEvent={addEvent} deleteEvent={deleteEvent} />
    </div>
  );
}

export default App;
