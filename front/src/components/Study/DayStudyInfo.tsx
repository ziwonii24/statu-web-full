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
  studyType: string
}

const DayStudyInfo: FunctionComponent<Interface> = (props: Interface) => {
  const { color, daySchedule, studyType } = props
  const { isRunning, timeElapsed, targetId, onToggleIsRunning, onSetTimeElapsed, onSetTargetDaySchedule } = useStopWatch()
  const { onPutDaySchedule } = useSchedule()
  let startTime = Date.now()

  console.log('daySchedule', daySchedule)

  const handleStopWatchClick = () => {
    onToggleIsRunning()
    startStopToggle()
    if (!isRunning) {
      onSetTargetDaySchedule(daySchedule.id)
    } else {
      onSetTargetDaySchedule(0)
    }
  }

  const handleSetTimeElapsed = async (elapsedTime: number) => {
    startTime = Date.now()
    onSetTimeElapsed(elapsedTime)
    daySchedule.achieve = daySchedule.achieve + elapsedTime
    onPutDaySchedule(daySchedule)
  }

  const startStopToggle = () => {
    startTime = Date.now()
    const timer = () => setInterval(() => handleSetTimeElapsed(Math.floor((Date.now() - startTime) / 60000)), 60000)
    if (!isRunning) {
      timer()
    } else {
      clearInterval(timer())
      handleSetTimeElapsed(Date.now() - startTime)
    }
  }

  const stopWatchBtn = useMemo(() => {
    return (
      <div onClick={handleStopWatchClick}>
        {(isRunning && daySchedule.id === targetId) ?
          <img src={pause} alt="중지버튼" className="stopWatch" />
          :
          <img src={play} alt="재생버튼" className="stopWatch" />
        }
      </div>
    )
  }, [isRunning])

  const progressBar = useMemo(() => {
    return (            
      daySchedule.goal !== 0 ?
        <progress 
          className={`progress-bar`}
          value={Math.min(daySchedule.achieve / daySchedule.goal, 1) * 100} max='100'/>
      :
        <progress 
          className={`progress-bar`}
          value={0} max='100'/>
    )
  }, [daySchedule.achieve])

  return (
    studyType == 'yesterday' ?

      <div className='todoItem-line'>

        <div className='todoItem-yesterday-title'>
          <div className='todoItem-circle' style={{ backgroundColor: color }} />
          {daySchedule.todo.length < 10 ? daySchedule.todo : daySchedule.todo+'...'}
        </div>

        <div className='todoItem-yesterday-progress'>
          {progressBar}
        </div>
        
      </div>  

    :

      <div className='todoItem-line'>

        <div className='todoItem-today-title'>
          <div className='todoItem-circle' style={{ backgroundColor: color }} />
          {daySchedule.todo.length < 10 ? daySchedule.todo : daySchedule.todo.slice(0,12)+'...'}
        </div>

        <div className='todoItem-stopWatch'>
          {stopWatchBtn}
        </div>

        <div className='todoItem-today-progress'>
          {progressBar}
        </div>

      </div>
  )
}

export default DayStudyInfo