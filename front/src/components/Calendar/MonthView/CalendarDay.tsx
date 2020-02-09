import React, { FunctionComponent, useState, MouseEvent } from 'react'
import useModal from '../../../hooks/useModal'
import useDrag from '../../../hooks/useDrag'
import useSchedule from '../../../hooks/useSchedule'
import dayjs from 'dayjs'
import uuid from 'uuid'
import axios from 'axios'

import Interface from './interfaces/CalendarDay.interface'
import { SubSchedule, DaySchedule } from '../../../store/schdule'

import '../styles/CalendarDay.scss'


const CalendarDay: FunctionComponent<Interface> = (props: Interface) => {
  const {
    calendarId,
    date,
    targetMonth,
    targetDateString,
    dayComponent,
    subSchedule,
    subScheduleLength,
    daySchedule,
    isAscending
  } = props;

  const SERVER_IP = process.env.REACT_APP_TEST_SERVER

  // console.log('subschedules', subSchedule)
  const { modalState, onOpenModal, onOpenDayModal, onOpenSubModal } = useModal()
  const { startDate, tempDate, endDate, mouseOverState, onSetStartDate, onSetTempDate, onSetEndDate } = useDrag()
  const { onDeleteSubSchedule, onDeleteDaySchedule } = useSchedule()

  // 소목표, 일일목표 관련 변수
  const day = dayjs(date).date()
  const newDate = date
  const subData = subSchedule && subSchedule.filter(schedule => schedule.startDate <= date && schedule.endDate >= date)
  const etcSubData = subSchedule && subSchedule.filter(schedule => schedule.startDate === '9999-99-99')[0]
  const dayDatas = daySchedule && daySchedule.filter(schedule => schedule.date === date)
  const dayData = getDayData()
  const dayItemColors = getColors()

  const sendStartDate = isAscending ? startDate : tempDate
  const sendEndDate = isAscending ? tempDate : startDate

  const initialSubSchedule = {
    id: 0,
    calendarId: calendarId,
    subTitle: '',
    color: '#AAAAAA',
    startDate: sendStartDate,
    endDate: sendEndDate,
  }

  const initialDaySchedule = {
    calendarId: calendarId,
    subTitleId: 0,
    id: 0,
    date: startDate,
    component: '',
    goal: 0,
    achieve: 0
  }

  // 드래그 관련 변수
  const dateCur = dateToNumber(date)
  const dateDragStart = dateToNumber(startDate)
  const dateDragOver = dateToNumber(tempDate)
  const draggedDays = isSelected(isAscending) ? 'draggedDays' : ''

  // 마우스 호버 변수
  const [hoverState, setHoverState] = useState<boolean>(false)
  const [hoverItemId, setHoverItemId] = useState<number>(0)

  // 사용자와 상호작용을 보여주기 위한 변수
  const active = modalState && (date === targetDateString) ? 'calendarActiveDate' : ''
  const activeNumber = modalState && date === targetDateString ? 'calendarActiveDateNumber' : ''
  const check = dayjs(targetMonth).month() !== dayjs(date).month()  // true
  const passedDate = check ? 'calendarpassedDate' : ''
  const pointerNone = mouseOverState ? 'pointerNone' : ''



  // HTML 렌더에 사용되는 핸들러
  const handleMouseDown = (e: MouseEvent) => {
    // if (e.target !== e.currentTarget) {
    //   return
    // }
    onSetStartDate(newDate)
    onSetTempDate(newDate)
    // console.log('mouseDown', modalState)
  }

  const handleMouseOver = (e: MouseEvent) => {
    // mouse down을 한번 한 상태에서만 mouse over 가능
    // if (e.target !== e.currentTarget) {
    //   return
    // }
    if (startDate !== '') {
      onSetTempDate(newDate)
      // console.log('mouseOverState', mouseOverState)
      // console.log('mouseOver', e.target)
    }
  }

  const handleMouseUp = (e: MouseEvent) => {
    // if (e.target !== e.currentTarget) {
    //   return
    // }
    onSetEndDate(newDate)
    // console.log('mouseUp', mouseOverState)
    if (startDate) {
      onOpenModal([subSchedule, initialSubSchedule, initialDaySchedule])
      // console.log('mouseUp')
    }
  }

  const handleOpenDayModal = (e: MouseEvent, subSchedules: SubSchedule[], daySchedule: DaySchedule) => {
    e.stopPropagation()
    onOpenDayModal(subSchedules, daySchedule)
    // console.log('openDayModal', modalState)
  }

  const handleOpenSubModal = (e: MouseEvent, subSchedule: SubSchedule) => {
    e.stopPropagation()
    onOpenSubModal(subSchedule)
    // console.log('openSubModal', modalState)
  }

  const handleDeleteSubSchedule = async (e: MouseEvent, id: number) => {
    e.stopPropagation()
    onDeleteSubSchedule(id)
    try {
      // const response =
      await axios.delete(SERVER_IP + '/subtitle/' + id)
      // mainPutResponse = response.data
      // mainPutLoading = true
      // console.log('success', mainPutResponse)
    }
    catch (e) {
      // mainPutError = e
      // console.error(mainPutError)
      console.error(e)
    }
    // console.log('deleteSub', modalState)
  }

  const handleDeleteDaySchedule = async (e: MouseEvent, id: number) => {
    e.stopPropagation()
    onDeleteDaySchedule(id)
    try {
      // const response =
      await axios.delete(SERVER_IP + '/todo/' + id)
      // mainPutResponse = response.data
      // mainPutLoading = true
      // console.log('success', mainPutResponse)
    }
    catch (e) {
      // mainPutError = e
      // console.error(mainPutError)
      console.error(e)
    }
    // console.log('deleteDay', modalState)
  }

  const handleMouseEnter = (id: number) => {
    if (!startDate) {
      setHoverState(true)
      setHoverItemId(id)
      // console.log('mouseEnter', modalState)
    }
  }

  const handleMouseLeave = () => {
    setHoverState(false)
    setHoverItemId(0)
    // console.log('mouseLeave', modalState)
  }


  // 사용 함수
  // 소목표 순서에 맞게 일일 목표 정렬
  function getDayData() {
    let dayData: DaySchedule[] = []
    subData.map(subItem => {
      const newDayDatas = dayDatas && dayDatas.filter(dayItem => dayItem.subTitleId === subItem.id)
      dayData = dayData.concat(newDayDatas)
      return subItem
    })
    const newDayDatas = dayDatas && dayDatas.filter(dayItem => dayItem.subTitleId === etcSubData.id)
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
        dayItemColors.push(subSchedule[0].color)
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


  return (
    <div
      data-test="calendarDayContainer"
      data-test2={`${active}`}
      className={`calendarDayContainer ${draggedDays} ${active} ${passedDate}`}
      style={{ width: `${100 / 7}%` }}
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
      onMouseUp={handleMouseUp}
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
        style={{ height: `${2.5 * subScheduleLength}vh`, width: `${100}%` }}
        className={`subDataList`}
        onMouseOver={handleMouseOver}
      >
        {subData && subData.map(schedule => {
          if (schedule.startDate !== '9999-99-99' && (schedule.startDate === date || dayjs(date).day() === 0)) {
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
                  top: `${2.5 * (subData.indexOf(schedule))}vh`,
                  width: `${100 * barLength}%`
                }}
                className={`subDataItem ${pointerNone}`}
                onMouseEnter={() => handleMouseEnter(schedule.id)}
                onMouseLeave={() => handleMouseLeave()}
                onMouseDown={(e) => handleOpenSubModal(e, schedule)}
              >
                {schedule.subTitle}
                {
                  hoverState && schedule.id === hoverItemId ?
                    <div
                      onMouseDown={(e) => handleDeleteSubSchedule(e, schedule.id)}
                      style={{ display: `inline-block` }}
                    >
                      x
                  </div>
                    :
                    ''
                }
              </div>
            )
          }
        })}
      </div>

      {/* daySchedule render */}
      <div data-test="dayDataList" className={`dayDataList`}>
        {dayData && dayData.map((schedule, idx) => (
          <div
            data-test="dayDataListItem"
            key={`day-item-${schedule.date}-${uuid()}`}
            className={`dayDataItem ${pointerNone}`}
            onMouseEnter={() => handleMouseEnter(schedule.id)}
            onMouseLeave={() => handleMouseLeave()}
            onMouseDown={(e) => handleOpenDayModal(e, subSchedule, schedule)}
          >
            <div
              className='dayListCircle'
              style={{ backgroundColor: dayItemColors[idx] }}
            />
            {schedule.todo}
            {
              hoverState && schedule.id === hoverItemId ?
                <div
                  onMouseDown={(e) => handleDeleteDaySchedule(e, schedule.id)}
                  style={{ display: `inline-block` }}
                >
                  x
                </div>
                :
                ''
            }
          </div>
        )
        )}
      </div>
      {/* <div
        className={`pointerInherit`}
        style={{ height: `${2.5}vh` }}
      /> */}
    </div>
  )
}

export default CalendarDay