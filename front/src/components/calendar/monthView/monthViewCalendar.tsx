import React, { useState, FunctionComponent } from 'react'
import dayjs from 'dayjs'

import PageInterface from './interfaces/Calendar.interface'
import { DataObj } from './interfaces/Calendar.interface'
import { dayOfWeek, daysArray } from './utils'
import CalendarRow from './CalendarRow'
import CalendarHeaders from './CalendarHeaders'

import './styles/Calendar.scss'

interface Props {
  targetDay: number
  title: string
  targetMonth: string
  showMonth: Boolean
  targetDateString: string
  handleState: (targetDay: number, targetDateString: string) => void
  width: string
  onClickDay?: (day: number, dayData: any) => void
  dayComponent?: object
  data?: DataObj[]
  containerClassName: string
  titleContainerClass: string
  monthTitleClass: string
  rowContainerClassName: string
  dayContainerClassName?: string
  daysHeaderContainerClass: string
  dayDataListClass?: string
  daysTitleContainerClass: string
  dayDataListItemClass?: string
  colorPastDates?: string
  colorActiveDate?: string
}

const monthViewCalendar: FunctionComponent<PageInterface> = (props: Props) => {
  const {
    targetDay,
    targetMonth,
    showMonth,
    onClickDay,
    title,
    data,
    handleState,
    targetDateString,
    width,
    containerClassName,
    titleContainerClass,
    monthTitleClass,
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
  const targetMonthString: string = dayjs(targetMonth).format('MMMM YYYY')
  const weeksArray: number[][] = daysArray(daysInMonth, targetMonthDayOfWeek)

  return (
    <div
      data-test="calendarContainer"
      className={`calendarContainer ${containerClassName || ''}`}
      style={{ width: width || '100% ' }}
    >
      <div
        data-test="calendarTitle"
        className={`calendarTitle ${titleContainerClass || ''}`}
      >
        {title}
      </div>
      {showMonth && (
        <div
          data-test="monthTitle"
          className={`monthTitle ${monthTitleClass || ''}`}
        >
          {targetMonthString}
        </div>
      )}
      <CalendarHeaders
        data-test="calendarHeaders"
        daysHeaderContainerClass={daysHeaderContainerClass || ''}
        daysTitleContainerClass={daysTitleContainerClass || ''}
      />
      {renderRows(weeksArray)}
    </div>
  )
}


export default monthViewCalendar