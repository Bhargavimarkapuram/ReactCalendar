import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import { format, addMonths, subMonths, startOfMonth, getDaysInMonth, getDay } from "date-fns";

function Calendar({ events, addEvent, deleteEvent }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [currentMonth, setCurrentMonth] = useState(format(selectedDate, "MMMM"));
  const [currentYear, setCurrentYear] = useState(format(selectedDate, "yyyy"));
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEventDate, setSelectedEventDate] = useState(null); 

  
  const handlePrevMonth = () => {
    const newDate = subMonths(selectedDate, 1);
    setSelectedDate(newDate);
    setCurrentMonth(format(newDate, "MMMM"));
    setCurrentYear(format(newDate, "yyyy"));
  };

  
  const handleNextMonth = () => {
    const newDate = addMonths(selectedDate, 1);
    setSelectedDate(newDate);
    setCurrentMonth(format(newDate, "MMMM"));
    setCurrentYear(format(newDate, "yyyy"));
  };

 
  const generateMonthView = () => {
    const firstDayOfMonth = startOfMonth(selectedDate);
    const daysInMonth = getDaysInMonth(selectedDate);
    const startDay = getDay(firstDayOfMonth);
    const days = [];

    
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  
  const handleDateClick = (day) => {
    if (day) {
      const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      setSelectedDate(newDate);
      setSelectedEventDate(newDate); 
      setShowEventForm(true);
    }
  };

  
  const handleAddEvent = () => {
    if (eventTitle.trim() && eventDescription.trim()) {
      addEvent({ title: eventTitle, description: eventDescription, date: selectedDate });
      setEventTitle("");
      setEventDescription("");
      setShowEventForm(false);
      setSelectedEventDate(null); 
    }
  };

  
  
const handleDeleteEvent = () => {
  if (selectedEventDate) {
    
    const eventToDelete = events.find((event) =>
      event.date.toDateString() === selectedEventDate.toDateString()
    );

    if (eventToDelete) {
      
      deleteEvent(eventToDelete); 
      setShowEventForm(false);
      setSelectedEventDate(null); 
    }
  }
};



  const handleCancelEvent = () => {
    setEventTitle("");
    setEventDescription("");
    setShowEventForm(false);
    setSelectedEventDate(null); 
  };

  
  const hasEvent = (day) => {
    return events.some((event) =>
      event.date.getDate() === day && event.date.getMonth() === selectedDate.getMonth() && event.date.getFullYear() === selectedDate.getFullYear()
    );
  };

 
  const getEventForDate = (day) => {
    return events.filter((event) =>
      event.date.getDate() === day && event.date.getMonth() === selectedDate.getMonth()
    );
  };

  const days = generateMonthView();

  return (
    <div className="calendar-container">
      <CalendarHeader
        currentMonth={currentMonth}
        currentYear={currentYear}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${day ? "" : "empty"} ${hasEvent(day) ? "event-day" : ""}`}
            onClick={() => handleDateClick(day)}
          >
            {day}
            {hasEvent(day) && (
              <div className="event-details">
                {getEventForDate(day).map((event, index) => (
                  <div key={index} className="event-title">{event.title}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {showEventForm && (
        <div className="event-form">
          <h3>{hasEvent(selectedEventDate?.getDate()) ? "Edit Event" : "Add Event"}</h3>
          <p>{`Selected Date: ${selectedDate.toDateString()}`}</p>
          <input
            type="text"
            placeholder="Event Title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
          <textarea
            placeholder="Event Description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
          <div className="form-buttons">
            {!hasEvent(selectedEventDate?.getDate()) ? (
              <button onClick={handleAddEvent}>Add Event</button>
            ) : (
              <>
                <button onClick={handleDeleteEvent}>Delete Event</button>
                <button onClick={handleCancelEvent}>Cancel</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
