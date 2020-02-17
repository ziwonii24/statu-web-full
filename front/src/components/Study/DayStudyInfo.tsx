import React, { FunctionComponent, useMemo } from 'react'
import useStopWatch from '../../hooks/useStopWatch'
import useSchedule from '../../hooks/useSchedule'
import { DaySchedule } from '../../store/schedule'

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

import pause from '../../img/pause.png'
import play from '../../img/play.png'

import './style/Study.scss'

dotenv.config({ path: path.join(__dirname, '.env') })
const SERVER_IP = process.env.REACT_APP_TEST_SERVER

interface Interface {
  color: string
  daySchedule: DaySchedule
}

const DayStudyInfo: FunctionComponent<Interface> = (props: Interface) => {
  const { color, daySchedule } = props
  const { isRunning, timeElapsed, targetId, onToggleIsRunning, onSetTimeElapsed, onSetTargetDaySchedule } = useStopWatch()
  const { onPutDaySchedule } = useSchedule()
  let startTime = Date.now()

  console.log('dayStudyInfo', daySchedule.todo)

  const handleStopWatchClick = () => {
    onToggleIsRunning()
    startStopToggle()
    if (!isRunning) {
      onSetTargetDaySchedule(daySchedule.id)
    } else {
      onSetTargetDaySchedule(0)
    }
    console.log(isRunning, timeElapsed)
  }
  console.log(isRunning, timeElapsed)

  const handleSetTimeElapsed = async (elapsedTime: number) => {
    startTime = Date.now()
    onSetTimeElapsed(elapsedTime)
    daySchedule.achieve = daySchedule.achieve + elapsedTime
    onPutDaySchedule(daySchedule)
    console.log(isRunning, timeElapsed)
  }

  const startStopToggle = () => {
    startTime = Date.now()
    const timer = () => setInterval(() => handleSetTimeElapsed(Math.floor((Date.now() - startTime) / 60000)), 60000)
    if (!isRunning) {
      timer()
      console.log(isRunning, timeElapsed)
    } else {
      clearInterval(timer())
      handleSetTimeElapsed(Date.now() - startTime)
      console.log(daySchedule)
    }
  }

  const stopWatchBtn = useMemo(() => {
    return (
      <div
        className='stopWatch'
        onClick={handleStopWatchClick}
      >
        {(isRunning && daySchedule.id === targetId) ?
          <img src={pause} alt="중지버튼" className="stopWatchButton" style={{ maxWidth: "100%" }} />
          :
          <img src={play} alt="재생버튼" className="stopWatchButton" style={{ maxWidth: "100%" }} />
        }
      </div>
    )
  }, [isRunning])

  const progressBar = useMemo(() => {
    return (
      daySchedule.goal !== 0 &&
        <div
          className={`progressBar`}
        >
          <div
            className={`progressBar`}
            style={{ backgroundColor: color, width: `${Math.min(daySchedule.achieve / daySchedule.goal, 1) * 100}%` }}
          />
        </div>
    )
  }, [daySchedule.achieve])

  return (
    <div
      className={`dayDataItem`}
    >
      <div className='subTitle'>
      <div
        className='dayListCircle'
        style={{ backgroundColor: color }}
      />
      {daySchedule.todo.slice(0, 4)}
      </div>
      {stopWatchBtn}
      <div className="stopWatchTimeProgress">
          {progressBar}
          <div className="achieveGoal">
            {daySchedule.achieve} / {daySchedule.goal}
        </div>
      </div>
    </div>
  )
}

export default DayStudyInfo