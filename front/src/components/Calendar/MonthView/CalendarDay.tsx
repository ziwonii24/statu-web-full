import React, { FunctionComponent } from 'react'
import useModal from '../../../hooks/modal/useModal'
import dayjs from 'dayjs'
import uuid from 'uuid'

import Interface from './interfaces/CalendarDay.interface'
import { DaySchedule, SubSchedule } from '../dataSet/DataSet.interface'

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
    subSchedule,
    subScheduleLength,
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
  const subData = subSchedule && subSchedule.filter(schedule => schedule.startDate <= date && schedule.endDate >= date)
  console.log('date, subData :', date, subData)
  const dayData = daySchedule && daySchedule.filter(schedule => schedule.date === date)
  const dayItemColors: string[] = []
  const getColors = () => {
    dayData.map((dayItem) => {
      let find = false
      for (let i = 0; i < subData.length; i++) {
        if (dayItem.subTitleId === subData[i].id) {
          dayItemColors.push(subData[i].color)
          find = true
          break
        }
      }
      if (!find) {
        dayItemColors.push('#AAAAAA')
      }
    })
    // console.log(dayItemColors)
  }
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

  getColors()

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

      {/* subSchedule render */}
      <div
        style={{ height: `${2.5 * subScheduleLength}vh` }}
        className={`subDataList`}
      >
        {subData && subData.map(schedule => {
          if (schedule.startDate === date || dayjs(date).day() === 0) {
            // 소 목표를 주 단위로 자르기
            const barLength = Math.min(
              (dayjs(schedule.endDate).diff(dayjs(date), 'day')) + 1,  // 소목표 끝날짜에서 오늘을 빼고 남은 날
              (7 - dayjs(date).day())  // 이 주의 마지막 날짜에서 오늘을 빼고 남은 날
            )
            return (
              <div
                key={schedule.id}
                style={{
                  backgroundColor: schedule.color,
                  top: `${2.3 * (subData.indexOf(schedule))}vh`,
                  // margin: `0 ${1 * barLength}%`,
                  width: `${100 * barLength}%`
                }}
                className={`subDataItem`}
              >
                {schedule.subTitle}
              </div>
            )
          }
        })}
      </div>

      {/* daySchedule render */}
      <ul data-test="dayDataList" className={`dayDataList ${dayDataListClass}`}>
        {dayData && dayData.map((schedule, idx) => (
          <li
            data-test="dayDataListItem"
            key={`day-item-${schedule.date}-${uuid()}`}
            className={`dayDataItem ${dayDataListItemClass}`}
          >
            <div
              className='dayListCircle'
              style={{ backgroundColor: dayItemColors[idx] }}
            />
            {schedule.component}
          </li>
        )
        )}
      </ul>
    </div>
  )
}

export default CalendarDay