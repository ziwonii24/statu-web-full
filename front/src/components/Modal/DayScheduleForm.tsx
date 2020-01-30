import React, { FunctionComponent } from 'react'
import DayScheduleInput from './DayScheduleInput'
import Interface from './interfaces/DayScheduleForm.interface'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/reducerIndex'

import './styles/DayScheduleForm.scss'

const DayScheduleForm: FunctionComponent<Interface> = (props: Interface) => {
  const {
    date,
    todo,
    goal,
    handleSubTitleId,
    handleTodo,
    handleGoal
  } = props

  const subScheduleIdColor = useSelector((state: RootState) => state.modal.subScheduleIdColor)

  const getDayScheduleInput = () => subScheduleIdColor.map(subSchedule => {
    handleSubTitleId(subSchedule[0])
    return (
      <DayScheduleInput
      key={subSchedule[0]}
      color={subSchedule[1]}
      todo={todo}
      goal={goal}
      handleTodo={handleTodo}
      handleGoal={handleGoal}
    />
    )
  })
  return (
    <>
      <h1>{date}</h1>
      {getDayScheduleInput()}
    </>
  )
}

export default DayScheduleForm