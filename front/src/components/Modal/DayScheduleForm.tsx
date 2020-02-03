import React, { FunctionComponent } from 'react'
import DayScheduleInput from './DayScheduleInput'
// import Interface from './interfaces/DayScheduleForm.interface'
import useDrag from '../../hooks/useDrag'
import useModal from '../../hooks/useModal'

import './styles/DayScheduleForm.scss'

const DayScheduleForm: FunctionComponent<{}> = () => {
  const { subSchedules, onCloseModal } = useModal()
  const { startDate, onSetStartDate, onSetEndDate } = useDrag()
  const handleCloseModal = () => {
    onCloseModal()
    onSetStartDate('')
    onSetEndDate('')
  }

  const getDayScheduleInput = () => subSchedules.map(schedule => {
    return (
      <DayScheduleInput
        key={schedule.id}
        date={startDate}
        subTitleId={schedule.id}
        color={schedule.color}
      />
    )
  })
  
  return (
    <>
      <h1>{startDate}</h1>
      {getDayScheduleInput()}
      {/* 기타 */}
      <DayScheduleInput
        key={1}
        date={startDate}
        subTitleId={1}
        color={'#AAAAAA'}
      />

      <div className="button-wrap">
        <div onClick={() => {
          handleCloseModal()
        }}>
          Confirm
          </div>
        <div onClick={handleCloseModal}>Cancel</div>
      </div>
    </>
  )
}

export default DayScheduleForm