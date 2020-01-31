import React, { FunctionComponent, useState, ChangeEvent } from 'react'
import SubScheduleForm from './SubScheduleForm'
import DayScheduleForm from './DayScheduleForm'
import useModal from '../../hooks/useModal'
import useDrag from '../../hooks/useDrag'
// import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'
import './styles/Modal.scss'

dotenv.config({ path: path.join(__dirname, '.env') })


const Modal: FunctionComponent<{}> = () => {
  const { startDate, endDate } = useDrag()

  // choose schedule
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked)
  }

  const isFewDaysSchedule: boolean = startDate === endDate ? false : true

  const [check, setCheck] = useState<boolean>(isFewDaysSchedule)
  const choose = check ? "subSchedule" : "daySchedule" 

  // choose schedule form
  const chosenScheduleForm = {
    "subSchedule": <SubScheduleForm />,
    "daySchedule": <DayScheduleForm />
  }
  const scheduleForm = chosenScheduleForm[choose]

  // overlay 층을 이용해서 모달 바깥 클릭으로도 모달 꺼지도록 설정
  return (
    <>
      <div className="Modal-overlay" />
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