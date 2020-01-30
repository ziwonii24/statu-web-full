import React, { FunctionComponent, useState, ChangeEvent } from 'react'
import SubScheduleForm from './SubScheduleForm'
import DayScheduleForm from './DayScheduleForm'
import { DaySchedule, SubSchedule } from '../Calendar/dataSet/DataSet.interface'
import useModal from '../../hooks/modal/useModal'
import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'
import './styles/Modal.scss'

import { useStore, useSelector } from 'react-redux'
import { setStartDate, setEndDate } from '../../store/drag'
import { RootState } from '../../store/reducerIndex'

dotenv.config({ path: path.join(__dirname, '.env') })

const Modal: FunctionComponent<{}> = () => {
  const date = useSelector((state: RootState) => state.drag.startDate)

  // daySchedule set
  const daySchedule: DaySchedule = {
    "calendarId": 1,
    "subTitleId": 0,
    "id": 0,
    "date": '',
    "component": '',
    "goal": 0,
    "achieve": 0,
  }

  // subSchedule set
  const [subTitle, setSubTitle] = useState<string>('')
  const [color, setColor] = useState<string>('#000000')

  let startDate = ''
  let endDate = ''

  const handleSubTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setSubTitle(e.target.value)
    console.log(e.target.value)
  }
  const handleColor = (color: string) => {
    setColor(color)
    console.log(color)
  }
  const handleStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    startDate = e.target.value
    store.dispatch(setStartDate(startDate))
    console.log(startDate)
  }
  const handleEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    endDate = e.target.value
    store.dispatch(setEndDate(endDate))
    console.log(endDate)
  }

  const subSchedule: SubSchedule = {
    "calenderId": 1,
    "id": 3,
    "subTitle": subTitle,
    "color": color,
    "startDate": startDate,
    "endDate": endDate,
  }

  // choose schedule
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked)
  }

  const [check, setCheck] = useState<boolean>(false)
  const choose = check ? "subSchedule" : "daySchedule"
  console.log('choose: ', choose)

  // choose schedule form
  const chosenScheduleForm = {
    "subSchedule":
      <SubScheduleForm
        subTitle={subTitle}
        color={color}
        startDate={startDate}
        endDate={endDate}
        handleSubTitle={handleSubTitle}
        handleColor={handleColor}
        handleStartDate={handleStartDate}
        handleEndDate={handleEndDate} />,
    "daySchedule":
      <DayScheduleForm
        date={date} />

  }

  const scheduleForm = chosenScheduleForm[choose]

  // choose schedule data
  const chosenScheduleData = {
    "subSchedule": subSchedule,
    "daySchedule": daySchedule
  }
  const schedule = chosenScheduleData[choose]

  // 모달 확인 버튼(제출)
  const handleSubmit = async (schedule: DaySchedule | SubSchedule) => {
    const SERVER_IP = process.env.REACT_APP_TEST_SERVER

    try {
      await axios.post(SERVER_IP + '/todo', schedule)
      console.log('success')
      console.log(schedule)
    }
    catch (e) {
      console.error(e)
    }
  }

  // 모달 취소
  const store = useStore()
  const { onCloseModal } = useModal()
  const handleCloseModal = () => {
    onCloseModal()
    store.dispatch(setStartDate(''))
  }

  // overlay 층을 이용해서 모달 바깥 클릭으로도 모달 꺼지도록 설정
  return (
    <>
      <div className="Modal-overlay" />
      <div className="Modal">
        <p className="title">계획 추가</p>
        <span>
          소목표:
          <input
            name="isSubSchedule"
            type="checkbox"
            checked={check}
            onChange={handleCheckboxChange} />
        </span>
        {scheduleForm}
        <div className="button-wrap">
          <div onClick={() => {
            handleCloseModal()
            handleSubmit(schedule)
          }}>
            Confirm
          </div>
          <div onClick={handleCloseModal}>Cancel</div>
        </div>
      </div>
    </>
  )
}

export default Modal