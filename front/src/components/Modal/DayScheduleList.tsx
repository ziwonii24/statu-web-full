import React, { FunctionComponent, useState, ChangeEvent } from 'react'
import Interface from './interfaces/DayScheduleList.interface'
import { DaySchedule } from '../Calendar/dataSet/DataSet.interface'
import { useDaySchedule } from '../../hooks/useSchedule'

const DayScheduleList: FunctionComponent<Interface> = (props: Interface) => {
  const {
    baseCalendarId,
    baseSubTitleId,
    baseId,
    baseTodo,
    baseGoal,
    date,
  } = props

  const [todo, setTodo] = useState<string>(baseTodo)
  const [goal, setGoal] = useState<number>(baseGoal)

  const daySchedule: DaySchedule = {
    "calendarId": baseCalendarId,
    "subTitleId": baseSubTitleId,
    "id": baseId,
    "date": date,
    "component": baseTodo,
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

  const { onPutDaySchedule, onDeleteDaySchedule } = useDaySchedule()

  const handleEdit = (schedule: DaySchedule) => {
    onPutDaySchedule(schedule)
  }

  const handleRemove = (scheduleId: number) => {
    onDeleteDaySchedule(scheduleId)
  }

  return (

    <div>
      <div
        className={`colorContainer`}
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
        style={{ display: `inline-block` }}
        onClick={() => handleEdit(daySchedule)}
      >
        *
          </div>
      <div
        style={{ display: `inline-block` }}
        onClick={() => handleRemove(baseId)}
      >
        -
          </div>
    </div>
  )
}

export default DayScheduleList