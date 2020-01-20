import React, { FunctionComponent } from 'react';

import Interface from './interfaces/CalendarHeaders.interface';

import './styles/CalendarHeaders.scss';

const CalendarHeaders: FunctionComponent<Interface> = props => {
  const { daysHeaderContainerClass, daysTitleContainerClass } = props;
  return (
    <div
      data-test="calendarDaysContainer"
      className={`calendarDaysContainer ${daysHeaderContainerClass}`}
    >
      <div
        data-test="calendarHeaderContainer"
        className={`calendarHeaderContainer ${daysTitleContainerClass}`}
      >
        Sun
      </div>
      <div
        data-test="calendarHeaderContainer"
        className={`calendarHeaderContainer ${daysTitleContainerClass}`}
      >
        Mon
      </div>
      <div
        data-test="calendarHeaderContainer"
        className={`calendarHeaderContainer ${daysTitleContainerClass}`}
      >
        Tue
      </div>
      <div
        data-test="calendarHeaderContainer"
        className={`calendarHeaderContainer ${daysTitleContainerClass}`}
      >
        Wed
      </div>
      <div
        data-test="calendarHeaderContainer"
        className={`calendarHeaderContainer ${daysTitleContainerClass}`}
      >
        Thu
      </div>
      <div
        data-test="calendarHeaderContainer"
        className={`calendarHeaderContainer ${daysTitleContainerClass}`}
      >
        Fri
      </div>
      <div
        data-test="calendarHeaderContainer"
        className={`calendarHeaderContainer ${daysTitleContainerClass}`}
      >
        Sat
      </div>
    </div>
  );
};

export default CalendarHeaders;
