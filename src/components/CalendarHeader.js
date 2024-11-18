import React from "react";

function CalendarHeader({ currentMonth, currentYear, onPrevMonth, onNextMonth }) {
  return (
    <div className="calendar-header">
      <button onClick={onPrevMonth}>{"<"}</button>
      {/* Updated here: Added a div with 'month-title' class for styling */}
      <div className="month-title">{`${currentMonth} ${currentYear}`}</div>
      <button onClick={onNextMonth}>{">"}</button>
    </div>
  );
}

export default CalendarHeader;

