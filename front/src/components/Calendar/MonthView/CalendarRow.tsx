import React, { FunctionComponent } from 'react'
import uuid from 'uuid'

import Interface from './interfaces/CalendarRow.interface'
import { DaySchedule } from '../dataSet/DataSet.interface'

import CalendarDay from './CalendarDay'

import './styles/CalendarRow.scss'

const CalendarRow: FunctionComponent<Interface> = (props: Interface) => {
  const {
    week,
    targetMonth,
    targetDay,
    targetDateString,
    handleState,
    dayComponent,
    daySchedule,
    rowContainerClassName,
    dayContainerClassName,
    dayDataListClass,
    dayDataListItemClass,
    colorPastDates,
    colorActiveDate,
    isAscending
  } = props

  const renderRows = (week: string[]) => {
    return week.map(day => {
      return (
        <CalendarDay
          data-test="calendarDay"
          dayContainerClassName={dayContainerClassName}
          dayDataListClass={dayDataListClass}
          dayDataListItemClass={dayDataListItemClass}
          key={`day-${day || uuid()}`}
          date={day}
          targetMonth={targetMonth}
          targetDay={targetDay}
          targetDateString={targetDateString}
          handleState={handleState}
          dayComponent={dayComponent}
          daySchedule={daySchedule}
          colorPastDates={colorPastDates}
          colorActiveDate={colorActiveDate}
          isAscending={isAscending}
        />
      )
    })
  }
  return (
    <div
      data-test="calendarRowContainer"
      className={`calendarRow ${rowContainerClassName}`}
    >
      {renderRows(week)}
    </div>
  )
}

export default CalendarRow