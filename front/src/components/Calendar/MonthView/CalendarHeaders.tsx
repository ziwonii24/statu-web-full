import React, { FunctionComponent } from 'react';

import Interface from './interfaces/CalendarHeaders.interface';

import './styles/CalendarHeaders.scss';

const CalendarHeaders: FunctionComponent<Interface> = (props: Interface) => {
  return (
    <div
      data-test="calendarDaysContainer"
      className={`calendarDaysContainer`}
    >
      <div
        data-test="calendarHeaderContainer"
        className={`calendarHeaderContainer`}
      >
        Sun
      </div>
      <div
        data-test="calendarHeaderContainer"
        className={`calendarHeaderContainer`}
      >
        Mon
      </div>
      <div
        data-test="calendarHeaderContainer"
        className={`calendarHeaderContainer`}
      >
        Tue
      </div>
      <div
        data-test="calendarHeaderContainer"
        className={`calendarHeaderContainer`}
      >
        Wed
      </div>
      <div
        data-test="calendarHeaderContainer"
        className={`calendarHeaderContainer`}
      >
        Thu
      </div>
      <div
        data-test="calendarHeaderContainer"
        className={`calendarHeaderContainer`}
      >
        Fri
      </div>
      <div
        data-test="calendarHeaderContainer"
        className={`calendarHeaderContainer`}
      >
        Sat
      </div>
    </div>
  );
};

export default CalendarHeaders;
