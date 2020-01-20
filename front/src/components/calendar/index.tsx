import React, { useState, ChangeEvent, FunctionComponent } from 'react';
import dayjs from 'dayjs'
import localeDe from "dayjs/locale/ko"
import MonthViewCalendar from './monthView/MonthViewCalendar'
import { DataObj } from './monthView/interfaces/MonthViewCalendar.interface'

const Calendar: FunctionComponent<{}> = () => {
  const [targetDay, setTargetDay] = useState<number>(1)
  const [targetDateString, setTargetDateString] = useState<string>(dayjs().locale(localeDe).format('YYYY-MM-DD'))
  const [targetMonth, setTargetMonth] = useState<string>(dayjs().locale(localeDe).format('YYYY-MM-DD'))
  
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const date: string = dayjs(e.target.value).startOf('M').format('YYYY-MM-DD')
    setTargetMonth(date)
  }

  const handleState = (targetDay: number, targetDateString: string) => {
    setTargetDay(targetDay)
    setTargetDateString(targetDateString)
  }
  return (
    <div className="containerDiv container-fluid">
        <div className="headerContainer">
          <header className="header">
            <h1 className="mainHeader">I LIKE STUDYING!</h1>
            {/* <p className="caption">
              (for statefull use, uncomment and pick a day to see the
              differance)
            </p> */}
          </header>
        </div>
        <MonthViewCalendar
          targetDay={targetDay}
          targetMonth={targetMonth}
          targetDateString={targetDateString}
          title="My Custom Header"
          titleContainerClass="exampleTitleContainerClass"
          showMonth={true}
          monthTitleClass="exampleMonthTitleClass"
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
        <div className="footerDiv">
          &copy; Created By Stevorated (Shirel Garber)
        </div>
      </div>
  )
}

export default Calendar

const data: DataObj[] = [
  {
    day: 1,
    title: 'item 1',
    // component: <div>item1</div>,
  },
  {
    day: 1,
    title: 'item 2',
    // component: <div>item2</div>,
  },
  {
    day: 1,
    title: 'item 6',
    // component: <div>item1</div>,
  },
  {
    day: 1,
    title: 'item 7',
    component: (
      <div
        onClick={() => console.log('clicked me!')}
        onMouseEnter={() => console.log('hover ME!')}
        className="hoverableItem"
      >
        item 7
      </div>
    ),
  },
  {
    day: 2,
    title: 'item 3',
    // component: <div>item3</div>,
  },
  {
    day: 2,
    title: 'item 4',
    // component: <div>item4</div>,
  },
  {
    day: 21,
    title: 'item 5',
    // component: <div>item5</div>,
  },
];