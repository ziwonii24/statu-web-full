import React, { FunctionComponent } from 'react';

import Interface from './interfaces/CalendarHeaders.interface';

import '../styles/CalendarHeaders.scss';

const CalendarHeaders: FunctionComponent<Interface> = (props: Interface) => {
  const { onPage } = props
  const CalendarDays = onPage !== 'Overview' ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] : ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  
  return (
    <div
      className={ onPage !== 'Overview' ? `calendarDaysContainer` : 'calendarDaysContainer-overview'}
    >
      {CalendarDays.map((day, idx) => (
        <div
          key={idx}
          className={`calendarHeaderContainer`}
          style={{width: `${100/7}%`, color: `${idx === 0 ? 'red' : (idx === 6 ? 'blue' : 'black')}`}}
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
