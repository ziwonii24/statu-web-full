import React, { FunctionComponent, useState, ChangeEvent } from 'react'
import SubScheduleForm from './SubScheduleForm'
import DayScheduleForm from './DayScheduleForm'
import useDrag from '../../hooks/useDrag'
import useModal from '../../hooks/useModal'
import path from 'path'
import dotenv from 'dotenv'
import './styles/Modal.scss'
import { useStore } from 'react-redux'

dotenv.config({ path: path.join(__dirname, '.env') })

const Modal: FunctionComponent<{}> = () => {
  const store = useStore()
  console.log('modal', store.getState())
  const { startDate, endDate, onSetStartDate, onSetEndDate } = useDrag()
  const { daySchedule, subSchedule, onCloseModal } = useModal()

  // choose schedule
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked)
  }

  let isFewDaysSchedule: boolean = 
    daySchedule.id !== 0 ? false :
    (subSchedule.id !== 0 ? true :
    (startDate !== endDate ? true : false))

  const [check, setCheck] = useState<boolean>(isFewDaysSchedule)
  const choose = check ? "subSchedule" : "daySchedule" 

  // choose schedule form
  const chosenScheduleForm = {
    "subSchedule": <SubScheduleForm />,
    "daySchedule": <DayScheduleForm />
  }
  const scheduleForm = chosenScheduleForm[choose]

  const handleCloseModal = () => {
    onCloseModal()
    onSetStartDate('')
    onSetEndDate('')
  }

  return (
    <>
      <div 
        onClick={handleCloseModal}
        className="Modal-overlay" 
      />
      <div className="Modal">
        <p className="title">계획 추가</p>
        {!isFewDaysSchedule ?
        (<span>
          소목표:
          <input
            name="isSubSchedule"
            type="checkbox"
            checked={check}
            onChange={handleCheckboxChange} />
        </span>)
        :
        ''
        }
        {scheduleForm}
      </div>
    </>
  )
}

export default Modal