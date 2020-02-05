import React, { FunctionComponent, useState, MouseEvent, ChangeEvent } from 'react'
import useDrag from '../../hooks/useDrag'
import useModal from '../../hooks/useModal'
import { useDaySchedule } from '../../hooks/useSchedule'
import { DaySchedule } from '../../store/daySchedule'
import axios from 'axios'

import './styles/DayScheduleForm.scss'

const DayScheduleForm: FunctionComponent<{}> = () => {
  const SERVER_IP = process.env.REACT_APP_TEST_SERVER

  let dayPostResponse: number | null = null; let dayPostLoading: boolean = false; let dayPostError: Error | null = null
  let dayPutResponse: number | null = null; let dayPutLoading: boolean = false; let dayPutError: Error | null = null

  const { daySchedule, subSchedules, onCloseModal } = useModal()
  const { startDate, onSetStartDate, onSetEndDate } = useDrag()
  const { onPostDaySchedule, onPutDaySchedule } = useDaySchedule()

  const [subTitleId, setSubTitleId] = useState<number>(daySchedule.subTitleId)
  const [date, setDate] = useState<string>(daySchedule.date)
  const [component, setComponent] = useState<string>(daySchedule.todo)
  const [goal, setGoal] = useState<number>(daySchedule.goal)
  const [color, setColor] = useState<string>(subSchedules[subSchedules.length - 1].color)

  console.log('subschedules', subSchedules)

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
  const handleGoal = (e: ChangeEvent<HTMLInputElement>) => {
    setGoal(parseInt(e.target.value))
  }
  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value)
  }

  // button
  const handleSubmit = (schedule: DaySchedule) => {
    if (schedule.id === 0) {
      postDayScheduleData()
    } else {
      putDayScheduleData()
    }
    // console.log(schedule)
  }

  const handleCloseModal = () => {
    onCloseModal()
    onSetStartDate('')
    onSetEndDate('')
  }

  async function postDayScheduleData() {
    console.log('in post', initialDaySchedule)
    try {
      const response = await axios.post(SERVER_IP + '/todo', initialDaySchedule)
      // console.log('response', response)
      dayPostResponse = response.data.id
      dayPostLoading = true
      // console.log('success', dayPostResponse)
    }
    catch (e) {
      dayPostError = e
      // console.error('error', dayPostError)
    }
    dayPostLoading = false
    if (!dayPostResponse) return 'null'
    onPostDaySchedule({ ...initialDaySchedule, id: dayPostResponse })
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
  }

  // function defaultColor() {
  //   const scheduleColor = subSchedules.filter(schedule => schedule.id === daySchedule.subTitleId)
  //   if (scheduleColor.length === 0) {
  //     return '#AAAAAA'
  //   } else {
  //     return scheduleColor[0].color
  //   }
  // }


  return (
    <>
      <h1>{startDate}</h1>
      <div className="content">
        {subSchedules.map(schedule => {
          if (schedule.color !== color) {
            return (
              <div
              key={schedule.id}
              className={`colorContainer`}
              style={{ backgroundColor: `${schedule.color}`, marginRight: `${1.5}vh` }}
              onClick={handleColorMenu}

            >
            </div>
            )
          }
        })}
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
                >
                </div>
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