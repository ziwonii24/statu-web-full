import React, { FunctionComponent } from 'react'
import Interface from './interfaces/CalendarNavi.interface'
import dayjs from 'dayjs'
import './styles/CalendarNavi.scss'

import right_arrow from '../../../img/arrow_right.png'
import left_arrow from '../../../img/arrow_back.png'

import { Row } from 'react-bootstrap'

interface Props {
  targetMonth: string;
  onMovePrevMonth: (now: string) => void;
  onMoveNextMonth: (now: string) => void;
}

const CalendarNavi:FunctionComponent<Interface> = (props: Props) => {
  const { targetMonth, onMovePrevMonth, onMoveNextMonth } = props

  return (
    <div
      className={`calendarNavi`}
    >
      <button className={`arrowBtn`} onClick={() => onMovePrevMonth(targetMonth)}>
        {/* &#60; */}
      <img src={left_arrow} alt="왼쪽화살표" style={{ height: "8px", width: "8px" }} />
      </button>
      <span>{dayjs(targetMonth).format('YYYY년 MM월')}</span>
      <button className={`arrowBtn`} onClick={() => onMoveNextMonth(targetMonth)}>
        {/* &#62; */}
        <img src={right_arrow} alt="오른쪽화살표" style={{  height: "8px", width: "8px"}} />
      </button>
    </div>
  )
}

export default CalendarNavi