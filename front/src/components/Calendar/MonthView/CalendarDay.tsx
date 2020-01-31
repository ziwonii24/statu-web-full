import React, { FunctionComponent } from 'react'
import useModal from '../../../hooks/useModal'
import useDrag from '../../../hooks/useDrag'
import dayjs from 'dayjs'
import uuid from 'uuid'

import Interface from './interfaces/CalendarDay.interface'
import { DaySchedule } from '../dataSet/DataSet.interface'

import './styles/CalendarDay.scss'

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

  const { modalState, onOpenModal } = useModal()
  const { startDate, tempDate, endDate, onSetStartDate, onSetTempDate, onSetEndDate } = useDrag()

  // 소목표, 일일목표 관련 변수
  const day = dayjs(date).date()
  const newDate = date
  const subData = subSchedule && subSchedule.filter(schedule => schedule.startDate <= date && schedule.endDate >= date)
  const dayDatas = daySchedule && daySchedule.filter(schedule => schedule.date === date)
  const dayData = getDayData()
  const dayItemColors = getColors()

  // 사용자와 상호작용을 보여주기 위한 변수
  const active = modalState && (date === targetDateString) ? 'calendarActiveDate' : ''
  const activeNumber = modalState && date === targetDateString ? 'calendarActiveDateNumber' : ''
  const check = dayjs(targetMonth).month() !== dayjs(date).month()  // true
  const passedDate = check ? 'calendarpassedDate' : ''

  // 드래그 관련 변수
  const dateCur = dateToNumber(date)
  const dateDragStart = dateToNumber(startDate)
  const dateDragOver = dateToNumber(tempDate)
  const draggedDays = isSelected(isAscending) ? 'draggedDays' : ''


  // HTML 렌더에 사용되는 핸들러
  const mouseDownHandler = () => {
    onSetStartDate(newDate)
    onSetTempDate(newDate)
  }

  const mouseOverHandler = () => {
    // mouse down을 한번 한 상태에서만 mouse over 가능
    if (startDate !== '') {
      onSetTempDate(newDate)
    }
  }

  const mouseUpHandler = () => {
    onSetEndDate(newDate)
    onOpenModal([subData, dayData])
  }


  // 사용 함수
  // 소목표 순서에 맞게 일일 목표 정렬
  function getDayData() {
    let dayData: DaySchedule[] = []
    subData.map(subItem => {
      const newDayDatas = dayDatas.filter(dayItem => dayItem.subTitleId === subItem.id)
      dayData = dayData.concat(newDayDatas)
      return subItem
    })
    const newDayDatas = dayDatas.filter(dayItem => dayItem.subTitleId === 1)
    dayData = dayData.concat(newDayDatas)
    return dayData
  }

  // dayData 의 subtitleId 를 통해 소목표의 색을 찾고 dayData의 순서에 맞게 색을 dayItemColors에 추가
  function getColors() {
    const dayItemColors: string[] = []
    dayData.map(dayItem => {
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
      return dayItem
    })
    return dayItemColors
  }

  // 드래그 관련 함수
  function isSelected(isAscending: boolean) {
    // 앞으로 갈 경우
    if (isAscending) {
      return dateCur >= dateDragStart && dateCur <= dateDragOver
    }
    // 뒤로 갈 경우
    return dateCur >= dateDragOver && dateCur <= dateDragStart
  }

  function dateToNumber(strDate: string): number {
    var result = strDate.replace(/\-/g, '')
    return parseInt(result)
  }

  // 모달을 열었을 때 보여줄 소목표들 색 설정
  function setSubDataIdColor() {
    let subDataIdColor: Array<[number, string]> = []
    subData.map(subItem => {
      subDataIdColor.push([subItem.id, subItem.color])
      return subItem
    })
    subDataIdColor.push([1, '#AAAAAA'])
    return subDataIdColor
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