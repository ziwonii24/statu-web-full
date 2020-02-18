import React, { FunctionComponent, useMemo } from 'react'
import ScheduleOverview from '../ScheduleViews/ScheduleOverview'
import useUser from '../../hooks/useUser'
import useWindowSize from '../../hooks/useWindowSize'
import { MainSchedule, SubSchedule, DaySchedule } from '../../store/schedule'

import './style/Board.scss'

interface Interface {
  getMainSchedules: MainSchedule[]
  getSubSchedules: SubSchedule[]
  getDaySchedules: DaySchedule[]
}

const Board: FunctionComponent<Interface> = (props: Interface) => {
  const { width } = useWindowSize()
  const { getMainSchedules, getSubSchedules, getDaySchedules } = props
  const { onGetUserInfo, onGetTargetUserInfo, onSetTargetUserInfo } = useUser()
  
  const hotSchedule = useMemo(() => getMainSchedules.sort(function (a, b) {
    if (a.view > b.view) return -1 
    else if (a.view === b.view && a.recommend >= b.recommend) return -1
    else return 1
  }).slice(0, 3)
  ,[getMainSchedules]) 

  const recommendSchedule = useMemo(() => onGetUserInfo && getMainSchedules.filter(schedule => 
    onGetUserInfo.category2.map(categoryName => schedule.category2.includes(categoryName)).includes(true))  // 카테고리가 하나라도 일치하면 true
    .sort(function (a, b) {
      if (a.view > b.view) return -1
      else if (a.view === b.view && a.recommend >= b.recommend) return -1
      else return 1
    }).slice(0, 3)
  ,[getMainSchedules]) 

  const hotScheduleList = useMemo(() => onGetUserInfo && hotSchedule.map(schedule => {
    onSetTargetUserInfo(schedule.userId)
    return <div className='board-item'>
      <ScheduleOverview
        key={schedule.id}
        mainSchedule={schedule}
        subSchedules={getSubSchedules}
        daySchedules={getDaySchedules}
      />
    </div>
  })
  ,[hotSchedule])

  const recommendScheduleList = useMemo(() => onGetUserInfo && recommendSchedule?.map(schedule => {
    onSetTargetUserInfo(schedule.userId)
    return <div className='board-item'>
      <ScheduleOverview
        key={schedule.id}
        mainSchedule={schedule}
        subSchedules={getSubSchedules}
        daySchedules={getDaySchedules}
      />
    </div>
  })
  ,[recommendSchedule])

  // <div className={ width >= 768 ? 'studyBox-right' : 'studyBox-right-mobile'}>
  // <div className={'studyBox ' + (width < 768 && 'studyBox-mobile')}>
  return (
    <div>
      <div className={"board-template " + (width < 768 && 'board-template')}>
        <p className="board-title">인기 계획표</p>
        <div className='board-form'>
          {hotScheduleList}
        </div>
      </div>

      <div className={"board-template " + (width < 768 && 'board-template')}>
        <p className="board-title">추천 계획표</p>
        <div className='board-form'>
          {recommendScheduleList}
        </div>
      </div>
    </div>
  )
}

export default Board