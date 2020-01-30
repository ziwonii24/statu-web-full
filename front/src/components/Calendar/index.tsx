import React, { useState, ChangeEvent, FunctionComponent, MouseEvent } from 'react';
import { useStore, useSelector } from 'react-redux'
import useModal from '../../hooks/modal/useModal'
import dayjs from 'dayjs'
import localeDe from "dayjs/locale/ko"
import MonthViewCalendar from './MonthView/MonthViewCalendar'
import WeekViewCalendar from './WeekView/WeekViewCalendar'
import CalendarNavi from './CalendarNavi/CalendarNavi'
import { daySchedule, subSchedule } from './dataSet/dataSet'
import Modal from '../Modal/Modal'
import path from 'path'
import dotenv from 'dotenv'

import { RootState } from '../../store/reducerIndex'

dotenv.config({ path: path.join(__dirname, '.env') })

const Calendar: FunctionComponent<{}> = () => {
  const store = useStore()
  console.log(store.getState())
  const targetDate: dayjs.Dayjs = dayjs().locale(localeDe)
  const [targetDateString, setTargetDateString] = useState<string>(targetDate.format('YYYY-MM-DD'))
  const [targetMonth, setTargetMonth] = useState<string>(targetDate.format('YYYY-MM-DD'))
  const [targetDay, setTargetDay] = useState<number>(targetDate.date())
  const [title, setTitle] = useState<string>('My Custom Schedule')
  const [showMonth, setShowMonth] = useState<boolean>(true)

  const { modalState } = useModal()
  const targetMonthString: string = dayjs(targetMonth).format('MMMM YYYY')

  // 이번달 시작날짜, 끝날짜 계산
  const daysInMonth = dayjs(targetMonth).daysInMonth()
  const startDayInMonth = dayjs(targetMonth).date(1)
  const endDayInMonth = dayjs(targetMonth).date(daysInMonth)

  const targetMonthStartDay = startDayInMonth.day() + 1
  const targetMonthEndDay = endDayInMonth.day() + 1

  // 시작날짜, 끝날짜를 이용해 이번 달에 렌더링할 캘린더 데이터 필터링
  const startDay = startDayInMonth.add(-(7 - targetMonthStartDay), 'day')
  const endDay = endDayInMonth.add((7 - targetMonthEndDay), 'day')

    // 일일 스케줄 데이터 필터링
  const daySchedules = daySchedule.filter(schedule => dayjs(schedule.date) >= startDay && dayjs(schedule.date) <= endDay)

    // 소목표 데이터 필터링
  const subSchedules = subSchedule
    .filter(schedule => !(dayjs(schedule.endDate) < startDay || dayjs(schedule.startDate) > endDay))  // 이번 달에 있는 일정
    .sort(function(a, b) {
      return parseInt(a.startDate) - parseInt(b.startDate)  // 시작 날짜가 이른 순서
    })
  // console.log(subSchedules)

    //소목표 개수를 이용해서 출력할 높이 지정
  // const visited
  // 사용함수
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const date: string = dayjs(e.target.value).startOf('M').format('YYYY-MM-DD')
    setTargetMonth(date)
  }

  const handleState = (targetDay: number, targetDateString: string) => {
    setTargetDay(targetDay)
    setTargetDateString(targetDateString)
    // console.log('modalState', modalState)
  }

  const handleMovePrevMonth = (now: string) => {
    const prevMonth = dayjs(now).add(-1, 'month').format('YYYY-MM-DD')

    setTargetMonth(prevMonth)
  }

  const handleMoveNextMonth = (now: string) => {
    const nextMonth = dayjs(now).add(1, 'month').format('YYYY-MM-DD')

    setTargetMonth(nextMonth)
  }

  const handleShowMonth = (e: MouseEvent<HTMLDivElement>) => {
    setShowMonth(!showMonth)
  }

  // TODO : 커스텀 hook으로 변경할 것
  // store.getState().drag.tempDate 로 tempDate가져오면 느림!(계속 변하기 때문인듯)
  const getSelectedDate = useSelector((state: RootState) => state.drag.tempDate)  
  const dragStart = dateToNumber(store.getState().drag.startDate) // startDate는 변하지 않음
  const dragOver = dateToNumber(getSelectedDate)
  // 소목표를 앞으로 설정하는지 뒤로 설정하는지에 대한 조건 - CalendarDay 컴포넌트까지 내려보냄
  const isAscending: boolean = dragOver - dragStart + 1 > 0 ? true : false

  function dateToNumber(strDate: string): number {
    var result = strDate.replace(/\-/g,'')
    return parseInt(result)
  }

  return (
    <div 
      // 모달을 제외한 화면을 클릭했을 때 모달이 종료되도록 조정 필요
      className="containerDiv container-fluid">

      {/* 달력 헤더 */}
      <div className="headerContainer">
        <header className="header">
          <h1 className="mainHeader">I LIKE STUDYING!</h1>
          {/* <p className="caption">
              (for statefull use, uncomment and pick a day to see the
              differance)
            </p> */}

          <div
            data-test="calendarTitle"
            className={`calendarTitle ${'exampleTitleContainerClass' || ''}`}
          >
            {title}
          </div>

          {/* 달력 제공 타입에 따른 헤더 전환 */}
          {showMonth ?
            <div
              data-test="monthTitle"
              className={`monthTitle ${'exampleMonthTitleClass' || ''}`}
            >
              {targetMonthString}
            </div>
            :
            <div
              data-test="weekTitle"
              className={`weekTitle ${'exampleWeekTitleClass' || ''}`}
            >
              {/* {targetMonthString} */}
              '몇 주차 입니다.'
            </div>
          }
        </header>
      </div>

      {/* 달력 저번달 다음달 전환 버튼 */}
      <CalendarNavi targetMonth={targetMonth} onMovePrevMonth={handleMovePrevMonth} onMoveNextMonth={handleMoveNextMonth} />

      {/* 달력 제공 타입 전환 버튼 */}
      <div
        onClick={handleShowMonth}
      >
        {showMonth ? 'Weekly' : 'Monthly'}
      </div>

      {/* showMonth 타입에 따른 렌더링 될 달력 선택 */}
      {showMonth ?
        <MonthViewCalendar
          targetDay={targetDay}
          targetMonth={targetMonth}
          targetDateString={targetDateString}
          subSchedule={subSchedules}
          daySchedule={daySchedules}
          handleState={handleState}
          width="92%"
          containerClassName="exampleClassContainer"
          rowContainerClassName="exampleClassRow"
          dayContainerClassName="exampleClassDay"
          dayDataListClass="exampleDayDataListClass"
          dayDataListItemClass="exampleDayDataListItemClass"
          daysHeaderContainerClass="exampleDaysHeaderContainerClass"
          daysTitleContainerClass="exampleDaysTitleContainerClass"
          colorActiveDate="palegoldenrod"
          colorPastDates="#f1f1f1"
          isAscending={isAscending}
        />
        :
        <WeekViewCalendar />
      }

      {/* 선택된 날짜에 대한 정보 제공 */}
      <div className="stateStatsContainer">
        <div className="stateStats">
          <p className="caption">targetDay: {targetDay}</p>
          <p className="caption">
            targetDateString: {dayjs(targetDateString).format('DD/MM/YYYY')}
          </p>
          <div>
            <label className="inputLabel caption">Pick a Month</label>
            <input
              style={{ marginTop: '20px', marginBottom: '20px' }}
              type="date"
              value={targetMonth}
              onChange={handleOnChange}
            />
          </div>
        </div>
      </div>

      {/* 풋터 */}
      <div className="footerDiv">
        &copy; Created By Stevorated (Shirel Garber)
      </div>

      {/* 모달 */}
      {modalState ?
        <Modal />
        :
        ''
      }
      
    </div>
  )
}

export default Calendar