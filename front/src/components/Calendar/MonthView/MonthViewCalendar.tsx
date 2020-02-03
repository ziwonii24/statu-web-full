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
    subSchedule,
    daySchedule,
    handleState,
    targetDateString,
    width,
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
          key={key}
          week={week}
          targetMonth={targetMonth}
          targetDay={targetDay}
          targetDateString={targetDateString}
          handleState={handleState || handleState}
          // dayComponent={dayComponent}
          subSchedule={subSchedule}
          daySchedule={daySchedule}
          colorPastDates={colorPastDates}
          colorActiveDate={colorActiveDate}
          isAscending={isAscending}
        />
      )
    })
  }
  const daysInMonth = dayjs(targetMonth).daysInMonth()
  const startDayInMonth = dayjs(targetMonth).date(1)
  const targetMonthStartDay = startDayInMonth.day() + 1
  
  // console.log('startDayInMonth, daysInMonth, targetMonthStartDay, targetMonthEndDay : ',
  //   startDayInMonth.day(), daysInMonth, targetMonthStartDay, targetMonthEndDay)
  const weeksArray: string[][] = daysArray(startDayInMonth, daysInMonth, targetMonthStartDay)

  return (
    <div
      data-test="calendarContainer"
      className={`calendarContainer`}
      style={{ width: width || '100% ' }}
    >
      <CalendarHeaders
        data-test="calendarHeaders"
      />
      {renderRows(weeksArray)}
    </div>
  )
}


export default MonthViewCalendar