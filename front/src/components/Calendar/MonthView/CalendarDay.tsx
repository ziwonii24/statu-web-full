import React, { FunctionComponent } from 'react'
import useModal from '../../../hooks/modal/useModal'
import dayjs from 'dayjs'
import uuid from 'uuid'

import Interface from './interfaces/CalendarDay.interface'
import { DaySchedule } from '../dataSet/DataSet.interface'

import './styles/CalendarDay.scss'

import { useStore } from 'react-redux'
import { setStartDate, setTempDate, setEndDate } from '../../../store/drag'

import { useSelector } from 'react-redux'
import { RootState } from '../../../store/reducerIndex'

const CalendarDay: FunctionComponent<Interface> = (props: Interface) => {
  const {
    date,
    targetMonth,
    targetDateString,
    dayComponent,
    daySchedule,
    dayContainerClassName,
    dayDataListClass,
    dayDataListItemClass,
    isAscending
  } = props;

  const store = useStore()

  const { modalState, onOpenModal } = useModal()
  const handleOpenModal = () => {
    onOpenModal()
  }
  const dayData = daySchedule && daySchedule.filter(item => item.date === date);
  const day = dayjs(date).date()
  const active = modalState && (date === targetDateString) ? 'calendarActiveDate' : ''
  const activeNumber = modalState && date === targetDateString ? 'calendarActiveDateNumber' : ''
  const newDate = date
  const check = dayjs(targetMonth).month() !== dayjs(date).month()  // true
  const passedDate = check ? 'calendarpassedDate' : ''

  const getSelectedDate = useSelector((state: RootState) => state.drag.tempDate)  
  const dragStart = store.getState().drag.startDate

  const dateCur = dateToNumber(date)  
  const dateDragStart = dateToNumber(dragStart)
  const dateDragOver = dateToNumber(getSelectedDate)
 
  const draggedDays = isSelected(isAscending) ? 'draggedDays' : ''

  function isSelected(isAscending: boolean) {
     // 앞으로 갈 경우
    if(isAscending) {
      return dateCur >= dateDragStart && dateCur <= dateDragOver
    }
    // 뒤로 갈 경우
    return dateCur >= dateDragOver && dateCur <= dateDragStart
  }

  function dateToNumber(strDate: string): number {
    var result = strDate.replace(/\-/g,'')
    return parseInt(result)
  }

  const mouseDownHandler = () => {
    store.dispatch(setStartDate(newDate))
    store.dispatch(setTempDate(newDate))
  }

  const mouseOverHandler = () => {
    // mouse down을 한번 한 상태에서만 mouse over 가능
    if (store.getState().drag.startDate !== '') {
      store.dispatch(setTempDate(newDate))
    }
  }

  const mouseUpHandler = () => {
    store.dispatch(setEndDate(newDate))
    onOpenModal()
  }

  return (
    <div
      data-test="calendarDayContainer"
      data-test2={`${active}`}
      className={`calendarDayContainer ${draggedDays} ${active} ${passedDate} ${dayContainerClassName}`}
      onMouseDown={mouseDownHandler}
      onMouseOver={mouseOverHandler}
      onMouseUp={mouseUpHandler}
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

      <ul data-test="dayDataList" className={`dayDataList ${dayDataListClass}`}>
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