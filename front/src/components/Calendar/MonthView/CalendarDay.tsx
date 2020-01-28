import React, { FunctionComponent } from 'react'
import dayjs from 'dayjs'
import uuid from 'uuid'

import Interface from './interfaces/CalendarDay.interface'
import DataObj from './interfaces/DataObj.interface'

import './styles/CalendarDay.scss'

// drag
import useDrag from './hooks/useDrag'
import { useStore, useSelector } from 'react-redux'
import { useEffect } from 'react'

interface Props {
  day: number;
  targetDay: number;
  targetMonth: string;
  targetDateString: string;
  handleState: (targetDay: number, targetDateString: string, modalState: boolean) => void;
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
    day,                    // 클릭했을때 날짜(D)
    targetDay,              // 현재 포커스 되어있는 날짜(D: 보통 1일)
    targetMonth,            // 현재 포커스 되어있는 날짜(M)
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

  const dayData = data && data.filter(item => item.day === day);  // 비어있는(?) 날짜(객체)
  const active = day && day === targetDay ? 'calendarActiveDate' : '';
  const activeNumber = day === targetDay ? 'calendarActiveDateNumber' : '';
  const date = dayjs(targetMonth).add(day - 1, 'day');  // 지정시간을 더한 날짜 - 클릭했을때 날짜를 받아오는데 (월-1)로 받아옴(객체) 
  const newDate = date.format('YYYY-MM-DD');            // 클릭했을때 날짜(YYYY-MM-DD)
  const now = dayjs();                                  // 현재 날짜(객체)
  const check = date.isBefore(now);  // true
  const passed = day && !!colorPastDates && check ? colorPastDates : '';

  // drag
  const { dragStart, dragOver, dragEnd } = useDrag(newDate)

  useEffect(() => (
    console.log('effect~!', newDate)
  ), [newDate])
  
  const store = useStore()
  console.log(store.getState())

  // const selectedStartDate = useSelector(state => state.drag, [])

  return (
    <div
      data-test="calendarDayContainer"
      data-test2={`${active}`}
      onClick={() => {
        // 날짜 클릭했을 때 달력 전체가 렌더링 되는거 수정 필요
        handleState(day, newDate, true)
        onClickDay && onClickDay(day, dayData)
      }}
      style={{ backgroundColor: active.length ? colorActiveDate : passed }}
      className={`calendarDayContainer ${active} ${dayContainerClassName}`}
      onMouseDown={dragStart}
      onMouseOver={dragOver}
      onMouseUp={dragEnd}
    >
      {day && (
        <p 
          data-test="calendarNum" 
          className={`calendarNum ${activeNumber}`}
          /* style={{ user-select: none }} */
        >
          {day}{' '}
        </p>
      )}

      {dayComponent}

      <ul data-test="dayDataList" className={`dayDataList ${dayDataListClass}`}>
        {dayData && dayData.map(item => (
          <li
            data-test="dayDataListItem"
            key={`day-item-${item.day}-${uuid()}`}
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