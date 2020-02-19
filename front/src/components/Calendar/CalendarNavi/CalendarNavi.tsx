import React, { FunctionComponent } from 'react'
import Interface from './interfaces/CalendarNavi.interface'
import dayjs from 'dayjs'
import './styles/CalendarNavi.scss'

import right_arrow from '../../../img/arrow_right.png'
import left_arrow from '../../../img/arrow_back.png'

const CalendarNavi:FunctionComponent<Interface> = (props: Interface) => {
  const { targetMonth, onMovePrevMonth, onMoveNextMonth, onPage } = props

  return (
    <div
      className={onPage!=='Overview' ? `calendarNavi `:'calendarNavi-overview'}
      // className='calendarNavi'
    >
      <div className={`arrowBtn`} onClick={(e) => onMovePrevMonth(e, targetMonth)}>
        {/* &#60; */}
        <img src={left_arrow} alt="왼쪽화살표" className={`arrowImg`} />
      </div>
      <div className={onPage!=='Overview'?`monthString`:'monthString-overview'}>{dayjs(targetMonth).format('YYYY년 MM월')}</div>
      <div className={`arrowBtn`} onClick={(e) => onMoveNextMonth(e, targetMonth)}>
        {/* &#62; */}
        <img src={right_arrow} alt="오른쪽화살표" className={`arrowImg`} />
      </div>
    </div>
  )
}

export default CalendarNavi