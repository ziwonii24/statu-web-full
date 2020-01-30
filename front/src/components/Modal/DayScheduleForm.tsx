import React, { FunctionComponent } from 'react'
import DayScheduleInput from './DayScheduleInput'
import Interface from './interfaces/DayScheduleForm.interface'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/reducerIndex'

import './styles/DayScheduleForm.scss'

const DayScheduleForm: FunctionComponent<Interface> = (props: Interface) => {
  const {
    date,
  } = props

  const subScheduleIdColor = useSelector((state: RootState) => state.modal.subScheduleIdColor)

  const getDayScheduleInput = () => subScheduleIdColor.map(subSchedule => {
    return (
      <DayScheduleInput
      key={subSchedule[0]}
      date={date}
      subTitleId={subSchedule[0]}
      color={subSchedule[1]}
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