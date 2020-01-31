import React, { FunctionComponent, useState, ChangeEvent } from 'react'
import Interface from './interfaces/DayScheduleInput.interface'
import { DaySchedule } from '../Calendar/dataSet/DataSet.interface'
import { useDaySchedule } from '../../hooks/useSchedule'

const DayScheduleInput: FunctionComponent<Interface> = (props: Interface) => {
  const {
    date,
    subTitleId,
    color,
  } = props
  
  const [todo, setTodo] = useState<string>('')
  const [goal, setGoal] = useState<number>(0)

  const daySchedule: DaySchedule = {
    "calendarId": 1,
    "subTitleId": subTitleId,
    "id": 1,
    "date": date,
    "component": todo,
    "goal": goal,
    "achieve": 0,
  }

  const handleTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
    console.log(e.target.value)
  }
  const handleGoal = (e: ChangeEvent<HTMLInputElement>) => {
    setGoal(parseInt(e.target.value))
    console.log(e.target.value)
  }

  const { onPostDaySchedule, onPutDaySchedule, onDeleteDaySchedule } = useDaySchedule()
  const handleSubmit = (schedule: DaySchedule) => {
    onPostDaySchedule(daySchedule)
    console.log(schedule)
  }

  return (
    <div className="content">
      <div
        className={`colorContainer`}
        style={{ backgroundColor: color }}
      />
      <input
        type="text"
        placeholder="목표를 입력하세요."
        value={todo}
        onChange={handleTodo}
      />
      <input
        type="number"
        placeholder="목표시간을 입력하세요."
        value={goal}
        onChange={handleGoal}
      />
      <div
        onClick={() => handleSubmit(daySchedule)}
      >
        +
      </div>
    </div>
  )
}

export default DayScheduleInput