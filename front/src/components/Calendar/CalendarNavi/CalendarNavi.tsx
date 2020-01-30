import React, { FunctionComponent } from 'react'
import Interface from './interfaces/CalendarNavi.interface'
import dayjs from 'dayjs'

interface Props {
  targetMonth: string;
  onMovePrevMonth: (now: string) => void;
  onMoveNextMonth: (now: string) => void;
}

const CalendarNavi:FunctionComponent<Interface> = (props: Props) => {
  const { targetMonth, onMovePrevMonth, onMoveNextMonth } = props

  return (
    <div>
      <button onClick={() => onMovePrevMonth(targetMonth)}>&#60;</button>
      <span>{dayjs(targetMonth).format('YYYY년 MM월')}</span>
      <button onClick={() => onMoveNextMonth(targetMonth)}>&#62;</button>
    </div>
  )
}

export default CalendarNavi