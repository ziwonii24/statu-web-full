import React, { FunctionComponent, useState, MouseEvent, ChangeEvent } from 'react'
import useDrag from '../../hooks/useDrag'
import useModal from '../../hooks/useModal'
import useSchedule from '../../hooks/useSchedule'
import { DaySchedule } from '../../store/schdule'
import dayjs from 'dayjs'
import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

import './styles/DayScheduleForm.scss'

dotenv.config({ path: path.join(__dirname, '.env') })
const SERVER_IP = process.env.REACT_APP_TEST_SERVER

const DayScheduleForm: FunctionComponent<{}> = () => {
  let dayPostResponse: number | null = null; let dayPostLoading: boolean = false; let dayPostError: Error | null = null
  let dayPutResponse: number | null = null; let dayPutLoading: boolean = false; let dayPutError: Error | null = null

  const { mainSchedule, daySchedule, subSchedules, onCloseModal } = useModal()
  const { startDate, onSetStartDate, onSetEndDate } = useDrag()
  const { onPutMainSchedule, onPostDaySchedule, onPutDaySchedule } = useSchedule()

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
  const handleGoalHour = (e: ChangeEvent<HTMLInputElement>) => {
    setGoalHour(parseInt(e.target.value))
    setGoal((parseInt(e.target.value) * 60) + goalMin)
  }
  const handleGoalMin = (e: ChangeEvent<HTMLInputElement>) => {
    setGoalMin(parseInt(e.target.value))
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
      postDayScheduleData()
    } else {
      putDayScheduleData()
    }
    handleCloseModal()
    // console.log(schedule)
  }

  const handleCloseModal = () => {
    onCloseModal()
    onSetStartDate('')
    onSetEndDate('')
  }

  async function postDayScheduleData() {
    // console.log('in post', initialDaySchedule)
    try {
      const response = await axios.post(SERVER_IP + '/todo', initialDaySchedule)
      dayPostResponse = response.data.id
      dayPostLoading = true
    }
    catch (e) {
      dayPostError = e
      // console.error('error', dayPostError)
    }
    dayPostLoading = false
    if (!dayPostResponse) return 'null'
    onPostDaySchedule({ ...initialDaySchedule, id: dayPostResponse })
    putMainSchedule()
  }

  async function putDayScheduleData() {
    try {
      const response = await axios.put(SERVER_IP + '/todo', initialDaySchedule)
      // console.log('response', response)
      dayPutResponse = response.data
      dayPutLoading = true
      console.log('success', dayPutResponse)
    }
    catch (e) {
      dayPutError = e
      // console.error('error', dayPutError)
    }
    dayPutLoading = false
    if (!dayPutResponse) return 'null'
    onPutDaySchedule(initialDaySchedule)
    putMainSchedule()
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
    try {
      const response = await axios.put(SERVER_IP + '/calendar', mainSchedule)
      onPutMainSchedule(mainSchedule)
      console.log(response.data)
    }
    catch (e) {
      console.error(e)
    }
  }


  return (
    <>
      <h1>{startDate}</h1>
      <div className="content">
        <div
          className={`colorContainer`}
          style={{ backgroundColor: color, marginRight: `${1.5}vh` }}
          onClick={handleColorMenu}
        />
        {showMenu ?
          subSchedules.map(schedule => {
            if (schedule.color !== color) {
              return (
                <div
                  key={schedule.id}
                  className={`colorContainer`}
                  style={{ backgroundColor: `${schedule.color}` }}
                  onClick={(e) => {
                    handleColor(e, schedule.id, schedule.color)
                  }}
                />
              )
            }
          })
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
          placeholder={hasComponent ? '' : '목표를 입력해주세요!'}
          value={component}
          onChange={handleComponent}
        />
        <input
          type="number"
          placeholder="목표시간을 입력하세요."
          value={goalHour}
          onChange={handleGoalHour}
        />
        <input
          type="number"
          placeholder="목표시간을 입력하세요."
          value={goalMin}
          onChange={handleGoalMin}
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