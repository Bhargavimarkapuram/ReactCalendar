import React from "react";

function CalendarHeader({ currentMonth, currentYear, onPrevMonth, onNextMonth }) {
  return (
    <div className="calendar-header">
      <button onClick={onPrevMonth}>{"<"}</button>
      
      <div className="month-title">{`${currentMonth} ${currentYear}`}</div>
      <button onClick={onNextMonth}>{">"}</button>
    </div>
  );
}

export default CalendarHeader;

