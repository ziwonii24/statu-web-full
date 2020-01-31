import React, { FunctionComponent } from 'react'
import DayScheduleInput from './DayScheduleInput'
// import Interface from './interfaces/DayScheduleForm.interface'
import useDrag from '../../hooks/useDrag'
import useModal from '../../hooks/useModal'
import { useDaySchedule } from '../../hooks/useSchedule'
import { RootState } from '../../store/reducerIndex'
import { useSelector } from 'react-redux'

import './styles/DayScheduleForm.scss'

const DayScheduleForm: FunctionComponent<{}> = () => {
  // const {
  //   date,
  // } = props

  const subScheduleIdColor = useSelector((state: RootState) => state.modal.subScheduleIdColor)
  const { onCloseModal } = useModal()
  const { startDate, endDate, onSetStartDate, onSetEndDate } = useDrag()

  const handleCloseModal = () => {
    onCloseModal()
    onSetStartDate('')
    onSetEndDate('')
  }

  const getDayScheduleInput = () => subScheduleIdColor.map(subSchedule => {
    return (
      <DayScheduleInput
        key={subSchedule[0]}
        date={startDate}
        subTitleId={subSchedule[0]}
        color={subSchedule[1]}
      />
    )
  })
  return (
    <>
      <h1>{startDate}</h1>
      {getDayScheduleInput()}

      <div className="button-wrap">
        <div onClick={() => {
          handleCloseModal()
          // handleSubmit(daySchedule)
        }}>
          Confirm
          </div>
        <div onClick={handleCloseModal}>Cancel</div>
      </div>
    </>
  )
}

export default DayScheduleForm