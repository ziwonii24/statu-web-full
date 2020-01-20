import React from 'react'
import dayjs from 'dayjs'

import PageInterface from './interfaces/Calendar.interface'
import { dayOfWeek, daysArray } from './utils'
import CalendarRow from './CalendarRow'
import CalendarHeaders from './CalendarHeaders'

import './styles/Calendar.scss'

class Calendar extends React.Component<PageInterface> {
  static defaultProps = {
    showMonth: false
  }

  state = {
    targetDay: 1,
    targetDateString: ''
  }

  handleState = (data: object) => {
    this.setState(data)
  }

  renderRows = (weeks: number[][]) => {
    let {
      onClickDay,
      targetMonth,
      targetDay,
      handleState,
      dayComponent,
      data,
      rowContainerClassName,
      dayContainerClassName,
      dayDataListClass,
      dayDataListItemClass,
      colorPastDates,
      colorActiveDate,
    } = this.props;

    targetDay = handleState ? targetDay : this.state.targetDay
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
          // targetDateString={targetMonth}
          handleState={handleState || this.handleState}
          onClickDay={onClickDay}
          dayComponent={dayComponent}
          data={data}
          colorPastDates={colorPastDates}
          colorActiveDate={colorActiveDate}
        />
      )
    })
  }

  render() {
    const {
      targetMonth,
      showMonth,
      title,
      width,
      containerClassName,
      daysHeaderContainerClass,
      daysTitleContainerClass,
      titleContainerClass,
      monthTitleClass,
    } = this.props
    const daysInMonth = dayjs(targetMonth).daysInMonth()
    const targetMonthDayOfWeek = dayOfWeek(targetMonth)
    const targetMonthString: string = dayjs(targetMonth).format('MMMM YYYY')
    const weeksArray: number[][] = daysArray(daysInMonth, targetMonthDayOfWeek)
    return (
      <div
        data-test="calendarContainer"
        className={`calendarContainer ${containerClassName || ''}`}
        style={{ width: width || '100% '}}
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
        {this.renderRows(weeksArray)}
      </div>
    )
  }
}

export default Calendar