import React, { FunctionComponent } from 'react'
import dayjs from 'dayjs'

import PageInterface from './interfaces/MonthViewCalendar.interface'
import { DataObj } from './interfaces/MonthViewCalendar.interface'
import { dayOfWeek, daysArray } from './utils'
import CalendarRow from './CalendarRow'
import CalendarHeaders from './CalendarHeaders'

import './styles/Calendar.scss'

interface Props {
  targetDay: number
  targetMonth: string
  targetDateString: string
  handleState: (targetDay: number, targetDateString: string) => void
  width: string
  onClickDay?: (day: number, dayData: any) => void
  dayComponent?: object
  data: DataObj[]
  containerClassName: string
  rowContainerClassName: string
  dayContainerClassName?: string
  daysHeaderContainerClass: string
  dayDataListClass?: string
  daysTitleContainerClass: string
  dayDataListItemClass?: string
  colorPastDates?: string
  colorActiveDate?: string
}

const MonthViewCalendar: FunctionComponent<PageInterface> = (props: Props) => {
  console.log('month calendar view')
  const {
    targetDay,
    targetMonth,
    onClickDay,
    data,
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
  } = props;

  const renderRows = (weeks: number[][]) => {
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
          onClickDay={onClickDay}
          // dayComponent={dayComponent}
          data={data}
          colorPastDates={colorPastDates}
          colorActiveDate={colorActiveDate}
        />
      )
    })
  }

  const daysInMonth = dayjs(targetMonth).daysInMonth()
  const targetMonthDayOfWeek = dayOfWeek(targetMonth)
  const weeksArray: number[][] = daysArray(daysInMonth, targetMonthDayOfWeek)

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