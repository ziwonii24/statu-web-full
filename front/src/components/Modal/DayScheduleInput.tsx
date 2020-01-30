import React, { FunctionComponent } from 'react'
import Interface from './interfaces/DayScheduleInput.interface'

const DayScheduleInput: FunctionComponent<Interface> = (props: Interface) => {
  const {
    todo,
    goal,
    color,
    handleTodo,
    handleGoal
  } = props

  return (
    <div className="content">
      <div
        className={`colorContainer`}
        style={{backgroundColor: color}}
      />
      <input
        type="text"
        placeholder="목표를 입력하세요."
        value={todo}
        onChange={handleTodo}
      /> <br/>
      <input
        type="number"
        placeholder="목표시간을 입력하세요."
        value={goal}
        onChange={handleGoal}
      />
    </div>
  )
}

export default DayScheduleInput