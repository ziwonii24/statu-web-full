import React, { FunctionComponent, ChangeEvent } from 'react'
import Interface from './interfaces/DayScheduleForm.interface'

interface Props {
  // 날짜 대신에 기간이 와야함 
  date: string
  todo: string
  goal: number
  handleDate: (e: ChangeEvent<HTMLInputElement>) => void
  handleTodo: (e: ChangeEvent<HTMLInputElement>) => void
  handleGoal: (e: ChangeEvent<HTMLInputElement>) => void
}

const MainScheduleForm: FunctionComponent<Interface> = (props: Props) => {
  const {
    date,
    todo,
    goal,
    handleDate,
    handleTodo,
    handleGoal
  } = props

  return (
    <div className="content">
      <input
        type="date"
        placeholder="날짜를 입력하세요."
        value={date}
        onChange={handleDate}
      /> <br/>
      <input
        type="text"
        placeholder="목표를 입력하세요."
        value={todo}
        onChange={handleTodo}
      />  <br/>
      <input
        type="number"
        placeholder="목표시간을 입력하세요."
        value={goal}
        onChange={handleGoal}
      />
    </div>
  )
}

export default MainScheduleForm