import React, { FunctionComponent } from 'react'
import dayjs from 'dayjs'
import Interface from './interfaces/MonthViewCalendar.interface'
import { daysArray } from './utils'
import CalendarRow from './CalendarRow'
import CalendarHeaders from './CalendarHeaders'

const MonthViewCalendar: FunctionComponent<Interface> = (props: Interface) => {
  const {
    calendarId,
    targetMonth,
    mainSchedule,
    subSchedule,
    daySchedule,
    handleState,
    targetDateString,
    colorActiveDate,
    colorPastDates,
    isAscending,
    onPage
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
          calendarId={calendarId}
          week={week}
          targetMonth={targetMonth}
          targetDateString={targetDateString}
          handleState={handleState || handleState}
          mainSchedule={mainSchedule}
          subSchedule={subSchedule}
          daySchedule={daySchedule}
          colorPastDates={colorPastDates}
          colorActiveDate={colorActiveDate}
          isAscending={isAscending}
          onPage={onPage}
        />
      )
    })
  }
  const daysInMonth = dayjs(targetMonth).daysInMonth()
  const startDayInMonth = dayjs(targetMonth).date(1)
  const targetMonthStartDay = startDayInMonth.day() + 1  
  const weeksArray: string[][] = daysArray(startDayInMonth, daysInMonth, targetMonthStartDay)

  return (
    <div>
      <CalendarHeaders
        data-test="calendarHeaders"
        onPage={onPage}
      />
      {renderRows(weeksArray)}
    </div>
  )
}


export default MonthViewCalendar