import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import dayjs from 'dayjs'
import uuid from 'uuid'

import Interface from './interfaces/CalendarDay.interface'
import DataObj from './interfaces/DataObj.interface'

import './styles/CalendarDay.scss'

interface Props {
  date: string;
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
    date,
    targetMonth,
    targetDateString,
    handleState,
    onClickDay,
    dayComponent,
    data,
    dayContainerClassName,
    dayDataListClass,
    dayDataListItemClass,
    colorActiveDate
  } = props;

  const dayData = data && data.filter(item => item.date === date);
  const day = dayjs(date).date()
  const modalState = useSelector((state: RootState) => state.modal.modalState)
  const active = modalState && (date === targetDateString) ? 'calendarActiveDate' : ''
  console.log(active)
  const activeNumber = modalState && date === targetDateString ? 'calendarActiveDateNumber' : ''
  const newDate = date
  const check = dayjs(targetMonth).month() !== dayjs(date).month()  // true
  const passedDate = check ? 'calendarpassedDate' : ''

  return (
    <div
      data-test="calendarDayContainer"
      data-test2={`${active}`}
      onClick={() => {
        // 날짜 클릭했을 때 달력 전체가 렌더링 되는거 수정 필요
        handleState(day, newDate)
        onClickDay && onClickDay(day, dayData)
      }}
      // style={{ backgroundColor: active ? colorActiveDate : passedDate }}
      className={`calendarDayContainer ${active} ${passedDate} ${dayContainerClassName}`}
    >
      {day && (
        <div
          data-test="calendarNum"
          className={`calendarNum ${activeNumber}`}
        >
          {day}{' '}
        </div>
      )}
      {dayComponent}
      <ul
        data-test="dayDataList"
        className={`dayDataList ${dayDataListClass}`}
      >
        {dayData && dayData.map(item => (
          <li
            data-test="dayDataListItem"
            key={`day-item-${item.date}-${uuid()}`}
            className={`dayDataItem ${dayDataListItemClass}`}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CalendarDay