import React, { FunctionComponent } from 'react';

import Interface from './interfaces/CalendarHeaders.interface';

import '../styles/CalendarHeaders.scss';

const CalendarHeaders: FunctionComponent<Interface> = () => {
  // const { daysHeaderContainerClass, daysTitleContainerClass } = props;
  const CalendarDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return (
    <div
      className={`calendarDaysContainer`}
    >
      {CalendarDays.map(day => (
        <div
          key={day}
          className={`calendarHeaderContainer`}
          style={{width: `${100/7}%`, color: `${day === 'Sun' ? 'red' : (day === 'Sat' ? 'blue' : 'black')}`}}
        >
          <div
            className={`calendarHeaderString`}
          >
            {day}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarHeaders;
