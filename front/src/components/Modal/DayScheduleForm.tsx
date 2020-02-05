import React, { FunctionComponent, useState, MouseEvent, ChangeEvent } from 'react'
import useDrag from '../../hooks/useDrag'
import useModal from '../../hooks/useModal'
import { useDaySchedule } from '../../hooks/useSchedule'
import { DaySchedule } from '../../store/daySchedule'

import './styles/DayScheduleForm.scss'

const DayScheduleForm: FunctionComponent<{}> = () => {
  const { daySchedule, subSchedules, onCloseModal } = useModal()
  const { startDate, onSetStartDate, onSetEndDate } = useDrag()
  const { onPostDaySchedule, onPutDaySchedule } = useDaySchedule()

  const [subTitleId, setSubTitleId] = useState<number>(daySchedule.subTitleId)
  const [date, setDate] = useState<string>(daySchedule.date)
  const [component, setComponent] = useState<string>(daySchedule.component)
  const [goal, setGoal] = useState<number>(daySchedule.goal)
  const [color, setColor] = useState<string>(defaultColor())

  const dayScheduleData: DaySchedule = {
    "calendarId": daySchedule.calendarId,
    "subTitleId": subTitleId,
    "id": daySchedule.id,
    "date": date,
    "component": component,
    "goal": goal,
    "achieve": daySchedule.achieve,
  }

  console.log(dayScheduleData)

  // color dropdown menu
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const handleColorMenu = (e: MouseEvent<HTMLDivElement>) => {
    setShowMenu(!showMenu)
  }

  // input handler
  const handleColor = (e: MouseEvent<HTMLDivElement>, subTitleId: number, color: string) => {
    setSubTitleId(subTitleId)
    setColor(color)
    setShowMenu(!showMenu)
  }
  const handleComponent = (e: ChangeEvent<HTMLInputElement>) => {
    setComponent(e.target.value)
  }
  const handleGoal = (e: ChangeEvent<HTMLInputElement>) => {
    setGoal(parseInt(e.target.value))
  }
  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value)
  }

  // button
  const handleSubmit = (schedule: DaySchedule) => {
    if (schedule.id === 0) {
      onPostDaySchedule(schedule)
    } else {
      onPutDaySchedule(schedule)
    }
    // console.log(schedule)
  }

  const handleCloseModal = () => {
    onCloseModal()
    onSetStartDate('')
    onSetEndDate('')
  }

  function defaultColor() {
    const scheduleColor = subSchedules.filter(schedule => schedule.id === daySchedule.subTitleId)
    if (scheduleColor.length === 0) {
      return '#AAAAAA'
    } else {
      return scheduleColor[0].color
    }
  }

  
  return (
    <>
      <h1>{startDate}</h1>
      <div className="content">
        <div
          className={`colorContainer`}
          onClick={handleColorMenu}
          style={{ backgroundColor: `${color}`, marginRight: `${1.5}vh` }}
        >
        </div >
        {showMenu ?
          subSchedules.map(schedule => (
            <div
              key={schedule.id}
              className={`colorContainer`}
              style={{ backgroundColor: `${schedule.color}` }}
              onClick={(e) => {
                handleColor(e, schedule.id, schedule.color)
              }}
            >
            </div>
          ))
          :
          ''
        }
        <br />
        <input
          type="date"
          placeholder="시작일자를 선택하세요."
          value={date}
          onChange={handleDate}
        />
        <input
          type="text"
          placeholder="목표를 입력하세요."
          value={component}
          onChange={handleComponent}
        />
        <input
          type="number"
          placeholder="목표시간을 입력하세요."
          value={goal}
          onChange={handleGoal}
        />
        <div className="button-wrap">
        <div onClick={() => {
          handleCloseModal()
          handleSubmit(dayScheduleData)
        }}>
          Confirm
          </div>
        <div onClick={handleCloseModal}>Cancel</div>
      </div>
      </div>
    </>
  )
}

export default DayScheduleForm