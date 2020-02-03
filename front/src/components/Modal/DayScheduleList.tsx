import React, { FunctionComponent, useState, ChangeEvent } from 'react'
import Interface from './interfaces/DayScheduleList.interface'
import { DaySchedule } from '../Calendar/dataSet/DataSet.interface'
import { useDaySchedule } from '../../hooks/useSchedule'
import useModal from '../../hooks/useModal'

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
    "component": todo,
    "goal": goal,
    "achieve": 0,
  }

  console.log(daySchedule)

  const handleTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
    console.log('handleTodo', e.target.value)
  }
  const handleGoal = (e: ChangeEvent<HTMLInputElement>) => {
    setGoal(parseInt(e.target.value))
    console.log('handleGoal', e.target.value)
  }

  const { onPutDaySchedule, onDeleteDaySchedule } = useDaySchedule()
  const { onPutDayScheduleOnModal, onDeleteDayScheduleOnModal } = useModal()

  // 수정했을 때 생기는 오류는 전체 일일목표 리스트에 추가될 때와 특정 하루 일일목표 리스트에 추가될 때 id 값이 다르게 들어가고 이로 인한 오류. 나중에 db랑 연결되면 해결될 것으로 보임
  const handleEdit = (schedule: DaySchedule) => {
    onPutDaySchedule(schedule)
    onPutDayScheduleOnModal(schedule)
    console.log('put', schedule)
  }

  const handleDelete = (scheduleId: number) => {
    onDeleteDaySchedule(scheduleId)
    onDeleteDayScheduleOnModal(scheduleId)
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
        onClick={() => handleDelete(baseId)}
      >
        -
          </div>
    </div>
  )
}

export default DayScheduleList