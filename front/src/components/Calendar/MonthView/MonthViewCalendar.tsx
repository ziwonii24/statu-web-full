import React, { FunctionComponent } from 'react'
import dayjs from 'dayjs'
import Interface from './interfaces/MonthViewCalendar.interface'
import { daysArray } from './utils'
import CalendarRow from './CalendarRow'
import CalendarHeaders from './CalendarHeaders'

import './styles/Calendar.scss'

const MonthViewCalendar: FunctionComponent<Interface> = (props: Interface) => {
  const {
    targetDay,
    targetMonth,
    daySchedule,
    handleState,
    targetDateString,
    width,
    containerClassName,
    rowContainerClassName,
    dayContainerClassName,
    dayDataListClass,
    dayDataListItemClass,
    daysHeaderContainerClass,
    daysTitleContainerClass,
    colorActiveDate,
    colorPastDates,
    isAscending
  } = props;
  
  const renderRows = (weeks: string[][]) => {
    let count = 0
    return weeks.map(week => {
      if (!week.length) return '';
      const key = `week-${count}-calendar`
      count++
      return (
        <CalendarRow
          data-test="calendarRow"
          rowContainerClassName={rowContainerClassName || ''}
          dayContainerClassName={dayContainerClassName || ''}
          dayDataListClass={dayDataListClass || ''}
          dayDataListItemClass={dayDataListItemClass || ''}
          key={key}
          week={week}
          targetMonth={targetMonth}
          targetDay={targetDay}
          targetDateString={targetDateString}
          handleState={handleState || handleState}
          // dayComponent={dayComponent}
          daySchedule={daySchedule}
          colorPastDates={colorPastDates}
          colorActiveDate={colorActiveDate}
          isAscending={isAscending}
        />
      )
    })
  }
  const startDayInMonth = dayjs(targetMonth).date(1)
  const daysInMonth = dayjs(targetMonth).daysInMonth()
  const targetMonthDayOfWeek = startDayInMonth.day() + 1
  const weeksArray: string[][] = daysArray(startDayInMonth, daysInMonth, targetMonthDayOfWeek)

  return (
    <div
      data-test="calendarContainer"
      className={`calendarContainer ${containerClassName || ''}`}
      style={{ width: width || '100% ' }}
    >
      <CalendarHeaders
        data-test="calendarHeaders"
        daysHeaderContainerClass={daysHeaderContainerClass || ''}
        daysTitleContainerClass={daysTitleContainerClass || ''}
      />
      {renderRows(weeksArray)}
    </div>
  )
}


export default MonthViewCalendar