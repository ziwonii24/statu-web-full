import React, { FunctionComponent } from 'react'
import dayjs from 'dayjs'
import Interface from './interfaces/MonthViewCalendar.interface'
import { daysArray } from './utils'
import CalendarRow from './CalendarRow'
import CalendarHeaders from './CalendarHeaders'

const MonthViewCalendar: FunctionComponent<Interface> = (props: Interface) => {
  const {
    targetMonth,
    subSchedule,
    daySchedule,
    handleState,
    targetDateString,
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
      // data-test="calendarContainer"
      // className={`calendarContainer ${containerClassName || ''}`}
    >
      <CalendarHeaders
        data-test="calendarHeaders"
      />
      {renderRows(weeksArray)}
    </div>
  )
}


export default MonthViewCalendar