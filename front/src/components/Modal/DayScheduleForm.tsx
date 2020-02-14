import React, { FunctionComponent, useState, MouseEvent, ChangeEvent, KeyboardEvent } from 'react'
import useDrag from '../../hooks/useDrag'
import useModal from '../../hooks/useModal'
import useSchedule from '../../hooks/useSchedule'
import { DaySchedule } from '../../store/schedule'
import dayjs from 'dayjs'


const DayScheduleForm: FunctionComponent<{}> = () => {

  const { mainSchedule, daySchedule, subSchedules, onCloseModal } = useModal()
  const { startDate, onSetStartDate, onSetEndDate } = useDrag()
  const { onPutMainSchedule, onPostDaySchedule, onPutDaySchedule, onGetMainTerm } = useSchedule()
  const subSchedule = daySchedule.id !== 0 ? subSchedules.filter(schedule => schedule.id === daySchedule.subTitleId)[0] : subSchedules[0]

  const [subTitleId, setSubTitleId] = useState<number>(subSchedule.id)
  const [date, setDate] = useState<string>(daySchedule.date)
  // In HTML, form elements such as <input>, <textarea>, and <select> typically maintain their own state and update it based on user input.
  const [component, setComponent] = useState<string>(daySchedule.todo)
  const [hasComponent, setHasComponent] = useState<boolean>(true)
  const [goal, setGoal] = useState<number>(daySchedule.goal)
  const initialHour = Math.floor(daySchedule.goal / 60)
  const initialMin = daySchedule.goal % 60
  const [goalHour, setGoalHour] = useState<number>(initialHour)
  const [goalMin, setGoalMin] = useState<number>(initialMin)
  const [color, setColor] = useState<string>(subSchedule.color)

  // console.log('subschedules', subSchedules)
  const initialDaySchedule: DaySchedule = {
    "calendarId": daySchedule.calendarId,
    "subTitleId": subTitleId,
    "id": daySchedule.id,
    "date": date,
    "todo": component,
    "goal": goal,
    "achieve": daySchedule.achieve,
  }

  // input handler
  const handleColor = (e: MouseEvent<HTMLDivElement>, subTitleId: number, color: string) => {
    setSubTitleId(subTitleId)
    setColor(color)
  }
  const handleComponent = (e: ChangeEvent<HTMLInputElement>) => {
    setComponent(e.target.value)
  }
  const handleGoalHour = (e: ChangeEvent<HTMLInputElement>) => {
    setGoalHour(parseInt(e.target.value) % 24)
    setGoal((parseInt(e.target.value) * 60) + goalMin)
  }
  const handleGoalMin = (e: ChangeEvent<HTMLInputElement>) => {
    setGoalMin(parseInt(e.target.value) % 60)
    setGoal((goalHour * 60) + parseInt(e.target.value))
  }
  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value)
  }

  // button
  const handleSubmit = (schedule: DaySchedule) => {
    if (component === '') {
      setHasComponent(false)
      return
    }
    if (schedule.id === 0) {
      onPostDaySchedule(initialDaySchedule)
      putMainSchedule()
    } else {
      onPutDaySchedule(initialDaySchedule)
      onGetMainTerm(mainSchedule.id)
    }
    handleCloseModal()
    // console.log(schedule)
  }

  const handleCloseModal = () => {
    onCloseModal()
    onSetStartDate('')
    onSetEndDate('')
  }

  const handleKeyDown = (e: KeyboardEvent, schedule: DaySchedule) => {
    if (e.key ==='Enter') {
      handleEnter(e, schedule)
    }
  }

  const handleEnter = (e: KeyboardEvent, schedule: DaySchedule) => {
    handleSubmit(schedule)
  }

  async function putMainSchedule() {
    let edited = false
    if (mainSchedule.startDate === '' || dayjs(mainSchedule.startDate) > dayjs(initialDaySchedule.date)) {
      mainSchedule.startDate = initialDaySchedule.date
      edited = true
    }
    if (mainSchedule.endDate === '' || dayjs(mainSchedule.endDate) < dayjs(initialDaySchedule.date)) {
      mainSchedule.endDate = initialDaySchedule.date
      edited = true
    }
    if (!edited) return
    onPutMainSchedule(mainSchedule)
  }


  return (
    <>
      <h1>{startDate}</h1>
      <div
        className="content"
        onKeyPress={(e) => handleKeyDown(e, initialDaySchedule)}
      >
        {subSchedules.map(schedule => {
          const chosenColor = schedule.color === color ? 'chosenColor' : ''
          return (
            <div
              key={schedule.id}
              className={`colorContainer ${chosenColor}`}
              style={{ backgroundColor: `${schedule.color}` }}
              onClick={(e) => {
                handleColor(e, schedule.id, schedule.color)
              }}
            />
          )
        })}
        <br />
        <input
          type="date"
          placeholder="시작일자를 선택하세요."
          value={date}
          onChange={handleDate}
        />
        <input
          type="text"
          placeholder={hasComponent ? '' : '목표를 입력해주세요!'}
          value={component}
          onChange={handleComponent}
        />
        <input
          type="number"
          placeholder="목표시간을 입력하세요."
          value={goalHour}
          onChange={handleGoalHour}
          min={0}
          max={24}
        />
        <input
          type="number"
          placeholder="목표시간을 입력하세요."
          value={goalMin}
          onChange={handleGoalMin}
          min={0}
          max={60}
          step={10}
        />
        <div className="button-wrap">
          <div onClick={() => {
            handleSubmit(initialDaySchedule)
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