import React, { FunctionComponent, HTMLAttributes } from 'react'
import dayjs from 'dayjs'
import uuid from 'uuid'

import Interface from './interfaces/CalendarDay.interface'
import { DataObj } from './interfaces/MonthViewCalendar.interface'

import './styles/CalendarDay.scss'

interface Props {
  day: number;
  targetDay: number;
  targetMonth: string;
  targetDateString: string;
  handleState: (targetDay: number, targetDateString: string) => void;
  onClickDay?: (day: number, dayData: any) => void;
  dayComponent?: object;
  data: DataObj[];
  dayContainerClassName?: string;
  dayDataListClass?: string;
  dayDataListItemClass?: string;
  colorPastDates?: string;
  colorActiveDate?: string;
}

const CalendarDay: FunctionComponent<Interface> = (props: Props) => {
  const {
    day,
    targetDay,
    targetMonth,
    targetDateString,
    handleState,
    onClickDay,
    dayComponent,
    data,
    dayContainerClassName,
    dayDataListClass,
    dayDataListItemClass,
    colorPastDates,
    colorActiveDate
  } = props;

  const dayData = data && data.filter(item => item.day == day);
  console.log(dayData.length)
  const active = day && day === targetDay ? 'calendarActiveDate' : '';
  const activeNumber = day === targetDay ? 'calendarActiveDateNumber' : '';
  const date = dayjs(targetMonth).add(day - 1, 'day');  // 지정시간을 더한 날짜
  // const newDate = date.format('YYYY-MM-DD');
  const now = dayjs();
  const check = date.isBefore(now);  // true
  const passed = day && !!colorPastDates && check ? colorPastDates : '';

  const handleData = () => {
    console.log('event')
    // dayData.map(item => (
    //   <li
    //     data-test="dayDataListItem"
    //     key={`day-item-${item.day}-${uuid()}`}
    //     className={`dayDataItem ${dayDataListItemClass}`}
    //   >
    //     {item.title}
    //   </li>
    //   )
    // )
    return (
      <div>
        {dayData.map(item => (
          <div
            data-test="dayDataListItem"
            key={`day-item-${item.day}-${uuid()}`}
            className={`dayDataItem ${dayDataListItemClass}`}
          >
            {item.title}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      data-test="calendarDayContainer"
      data-test2={`${active}`}
      onClick={() => {
        // 날짜 클릭했을 때 달력 전체가 렌더링 되는거 수정 필요
        handleState(day, targetDateString)
        onClickDay && onClickDay(day, dayData)
      }}
      style={{ backgroundColor: active.length ? colorActiveDate : passed }}
      className={`calendarDayContainer ${active} ${dayContainerClassName}`}
    >
      {day && (
        <p
          data-test="calendarNum"
          className={`calendarNum ${activeNumber}`}
        >
          {day}{' '}
        </p>
      )}
      {dayComponent}
      <div>
        {dayData && dayData.map(item => (
          <div
            data-test="dayDataListItem"
            key={`day-item-${item.day}-${uuid()}`}
            className={`dayDataItem ${dayDataListItemClass}`}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CalendarDay