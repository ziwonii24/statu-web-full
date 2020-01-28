import React, { FunctionComponent } from 'react'
import useModal from '../../../hooks/modal/useModal'
import dayjs from 'dayjs'
import uuid from 'uuid'

import Interface from './interfaces/CalendarDay.interface'
import { DaySchedule } from '../dataSet/DataSet.interface'

import './styles/CalendarDay.scss'

interface Props {
  date: string;
  targetDay: number;
  targetMonth: string;
  targetDateString: string;
  handleState: (targetDay: number, targetDateString: string) => void;
  dayComponent?: object;
  daySchedule: DaySchedule[];
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
    dayComponent,
    daySchedule,
    dayContainerClassName,
    dayDataListClass,
    dayDataListItemClass
  } = props;

  const { modalState, onOpenModal } = useModal()
  const handleOpenModal = () => {
    onOpenModal()
  }
  const dayData = daySchedule && daySchedule.filter(item => item.date === date);
  const day = dayjs(date).date()
  const active = modalState && (date === targetDateString) ? 'calendarActiveDate' : ''
  // console.log(active)
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
        handleOpenModal()
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
            {item.component}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CalendarDay