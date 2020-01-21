import React, { useState, ChangeEvent, FunctionComponent, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { openModal } from '../../store/calendar/actions'
import dayjs from 'dayjs'
import localeDe from "dayjs/locale/ko"
import MonthViewCalendar from './MonthView/MonthViewCalendar'
import WeekViewCalendar from './WeekView/WeekViewCalendar'
import CalendarNavi from './CalendarNavi/CalendarNavi'
import { DataObj } from './MonthView/interfaces/MonthViewCalendar.interface'
import Modal from './Modal/Modal'

const Calendar: FunctionComponent<{}> = () => {
  const date: string = dayjs().format('YYYY-MM-DD')
  const [now, setNow] = useState<number>(dayjs(date).valueOf())
  const [targetDay, setTargetDay] = useState<number>(1)
  const [targetDateString, setTargetDateString] = useState<string>(dayjs().locale(localeDe).format('YYYY-MM-DD'))
  const [targetMonth, setTargetMonth] = useState<string>(dayjs().locale(localeDe).format('YYYY-MM-DD'))
  const [title, setTitle] = useState<string>('My Custom Header')
  const [showMonth, setShowMonth] = useState<Boolean>(true)

  const dispatch = useDispatch()

  const targetMonthString: string = dayjs(targetMonth).format('MMMM YYYY')

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const date: string = dayjs(e.target.value).startOf('M').format('YYYY-MM-DD')
    setTargetMonth(date)
  }

  const handleState = (targetDay: number, targetDateString: string) => {
    setTargetDay(targetDay)
    setTargetDateString(targetDateString)
    dispatch(openModal())
  }

  const handleMovePrevMonth = (now: string) => {
    const nowString = now.split('-')
    let year = parseInt(nowString[0])
    let month = parseInt(nowString[1]) - 1

    if (month < 1) {
      month = 12
      year = year - 1
    }
    const prevString = year + '-' + month + '-' + nowString[2]
    const prevMonth = dayjs(prevString).startOf('M').format('YYYY-MM-DD')

    setTargetMonth(prevMonth)
    setNow(dayjs(prevMonth).valueOf())
  }

  const handleMoveNextMonth = (now: string) => {
    const nowString = now.split('-')
    let year = parseInt(nowString[0])
    let month = parseInt(nowString[1]) + 1
    if (month > 12) {
      month = 1
      year = year + 1
    }
    const nextString = year + '-' + month + '-' + nowString[2]
    const nextMonth = dayjs(nextString).startOf('M').format('YYYY-MM-DD')

    setTargetMonth(nextMonth)
    setNow(dayjs(nextMonth).valueOf())
  }

  const handleShowMonth = (e: MouseEvent<HTMLDivElement>) => {
    setShowMonth(!showMonth)
  }

  // 불러올 데이터  
  const data: DataObj[] = [
    {
      day: 1,
      title: 'item 1',
    },
    {
      day: 1,
      title: 'item 2',
    },
    {
      day: 1,
      title: 'item 6',
    },
    {
      day: 1,
      title: 'item 7',
    },
    {
      day: 2,
      title: 'item 3',
    },
    {
      day: 2,
      title: 'item 4',
    },
    {
      day: 21,
      title: 'item 5',
    },
  ];

  return (
    <div className="containerDiv container-fluid">

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
          onClickDay={(day: number, data: DataObj) =>
            console.log('onClick', day, data)
          }
          data={data}
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
      <Modal />
    </div>
  )
}

export default Calendar