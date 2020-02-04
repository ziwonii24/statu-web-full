import React, { useState, FunctionComponent } from 'react';
import Modal from '../Modal/Modal'
import useModal from '../../hooks/useModal'
import useDrag from '../../hooks/useDrag'
import MonthViewCalendar from './MonthView/MonthViewCalendar'
import CalendarNavi from './CalendarNavi/CalendarNavi'
import { SubSchedule } from '../../store/subSchedule';
import { DaySchedule } from '../../store/daySchedule';

import dayjs from 'dayjs'
import localeDe from "dayjs/locale/ko"
import path from 'path'
import dotenv from 'dotenv'

import './styles/Calendar.scss'

dotenv.config({ path: path.join(__dirname, '.env') })


interface Interface {
  calendarId: number
  defaultTitle: string
  subSchedule: SubSchedule[]
  daySchedule: DaySchedule[]
  represent: boolean
}


const Calendar: FunctionComponent<Interface> = (props: Interface) => {
  const {
    calendarId,
    defaultTitle,
    subSchedule,
    daySchedule,
    represent,
  } = props

  console.log('Calendar View')
  const { startDate, tempDate } = useDrag()
  const targetDate: dayjs.Dayjs = dayjs().locale(localeDe)
  const [targetDateString, setTargetDateString] = useState<string>(targetDate.format('YYYY-MM-DD'))
  const [targetMonth, setTargetMonth] = useState<string>(targetDate.format('YYYY-MM-DD'))
  const [title, setTitle] = useState<string>(defaultTitle)
  const [showMonth, setShowMonth] = useState<boolean>(represent)

  const { modalState } = useModal()

  // 이번달 시작날짜, 끝날짜 계산
  const daysInMonth = dayjs(targetMonth).daysInMonth()
  const startDayInMonth = dayjs(targetMonth).date(1)
  const endDayInMonth = dayjs(targetMonth).date(daysInMonth)

  const targetMonthStartDay = startDayInMonth.day() + 1
  const targetMonthEndDay = endDayInMonth.day() + 1

  // 시작날짜, 끝날짜를 이용해 이번 달에 렌더링할 캘린더 데이터 필터링
  const startDay = startDayInMonth.add(-(targetMonthStartDay - 1), 'day')
  const endDay = endDayInMonth.add((7 - targetMonthEndDay), 'day')

  // 일일 스케줄 데이터 필터링
  const daySchedules = daySchedule.filter(schedule => dayjs(schedule.date) >= startDay && dayjs(schedule.date) <= endDay)

  // 소목표 데이터 필터링
  const subSchedules = subSchedule
    .filter(schedule => !(dayjs(schedule.endDate) < startDay || dayjs(schedule.startDate) > endDay))  // 이번 달에 있는 일정
    .sort(function (a, b) {
      if (sortDate(a.startDate, b.startDate) === 0) {
        return sortDate(b.endDate, a.endDate)
      } else {
        return sortDate(a.startDate, b.startDate)
      }
    })

  // 사용함수
  function sortDate(first: string, second: string) {
    const [firstYear, firstMonth, firstDay] = first.split('-').map(string => parseInt(string))
    const [secondYear, secondMonth, secondDay] = second.split('-').map(string => parseInt(string))

    if (firstYear < secondYear) {
      return -1
    } else if (firstYear > secondYear) {
      return 1
    } else {
      if (firstMonth < secondMonth) {
        return -1
      } else if (firstMonth > secondMonth) {
        return 1
      } else {
        if (firstDay < secondDay) {
          return -1
        } else if (firstDay > secondDay) {
          return 1
        } else {
          return 0
        }
      }
    }
  }

  const handleState = (targetDateString: string) => {
    setTargetDateString(targetDateString)
  }

  const handleMovePrevMonth = (now: string) => {
    const prevMonth = dayjs(now).add(-1, 'month').format('YYYY-MM-DD')
    setTargetMonth(prevMonth)
  }

  const handleMoveNextMonth = (now: string) => {
    const nextMonth = dayjs(now).add(1, 'month').format('YYYY-MM-DD')
    setTargetMonth(nextMonth)
  }

  const handleShowMonth = () => {
    if (represent !== true) {
      setShowMonth(!showMonth)
    }
  }

  // TODO : 커스텀 hook으로 변경할 것
  // store.getState().drag.tempDate 로 tempDate가져오면 느림!(계속 변하기 때문인듯)
  const getSelectedDate = tempDate
  const dragStart = dateToNumber(startDate) // startDate는 변하지 않음
  const dragOver = dateToNumber(getSelectedDate)
  // 소목표를 앞으로 설정하는지 뒤로 설정하는지에 대한 조건 - CalendarDay 컴포넌트까지 내려보냄
  const isAscending: boolean = dragOver - dragStart + 1 > 0 ? true : false

  function dateToNumber(strDate: string): number {
    var result = strDate.replace(/\-/g, '')
    return parseInt(result)
  }

  return (
    <div
      // 모달을 제외한 화면을 클릭했을 때 모달이 종료되도록 조정 필요
      className={`calendarContainer`}>

      {/* 달력 헤더 */}
      <div
        className="headerContainer"
        onClick={handleShowMonth}
      >
        <header className="header">
          <div
            className={`calendarTitle`}
          >
            {title}
          </div>
        </header>
      </div>

      {showMonth ?
        <>
          {/* 달력 저번달 다음달 전환 버튼 */}
          <CalendarNavi targetMonth={targetMonth} onMovePrevMonth={handleMovePrevMonth} onMoveNextMonth={handleMoveNextMonth} />

          {/* showMonth 타입에 따른 렌더링 될 달력 선택 */}
          <MonthViewCalendar
            targetMonth={targetMonth}
            targetDateString={targetDateString}
            subSchedule={subSchedules}
            daySchedule={daySchedules}
            handleState={handleState}
            colorActiveDate="palegoldenrod"
            colorPastDates="#f1f1f1"
            isAscending={isAscending}
          />

          {/* 모달 */}
          {modalState ?
            <Modal />
            :
            ''
          }
        </>
        :
        ''
      }


    </div>
  )
}

export default Calendar