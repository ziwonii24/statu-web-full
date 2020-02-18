import React, { FunctionComponent, useState, ChangeEvent, KeyboardEvent } from 'react'
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

  const handleESC = (e: KeyboardEvent) => {
    console.log(e.key)
    if (e.key !== 'Escape') return
    handleCloseModal()
    console.log('escape')
  }

  return (
    <div
      onKeyDown={(e) => handleESC(e)} 
    >
      <div 
        className="Modal-overlay" 
        onClick={handleCloseModal}
      />
      <div 
        className="Modal"
      >
        <p className="title">계획 추가</p>
        <hr color="gray"/>
        {!isFewDaysSchedule ?
        (<span>
          기간 목표
          <input
            className="checkBox"
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
    </div>
  )
}

export default Modal