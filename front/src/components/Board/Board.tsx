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
  const { onGetUserInfo, onSetTargetUserInfo } = useUser()
  
  const hotSchedule = useMemo(() => onGetUserInfo && getMainSchedules.filter(schedule => schedule.pb === true)
    .sort(function (a, b) {
      if (a.view > b.view) return -1 
      else if (a.view === b.view && a.recommend >= b.recommend) return -1
      else return 1
    }).slice(0, 3)
  ,[getMainSchedules]) 

  const recommendSchedule = useMemo(() => onGetUserInfo && getMainSchedules.filter(schedule => 
    schedule.pb === true && onGetUserInfo.category2.map(categoryName => schedule.category2.includes(categoryName)).includes(true))  // 카테고리가 하나라도 일치하면 true
    .sort(function (a, b) {
      if (a.view > b.view) return -1
      else if (a.view === b.view && a.recommend >= b.recommend) return -1
      else return 1
    }).slice(0, 3)
  ,[getMainSchedules]) 

  const hotScheduleList = useMemo(() => onGetUserInfo && hotSchedule?.map(schedule => {
    onSetTargetUserInfo(schedule.userId)
    return <div key={schedule.id} className={ width > 768 ? 'board-item' : 'board-item-mobile'}>
      <ScheduleOverview
        key={schedule.id}
        mainSchedule={schedule}
        subSchedules={getSubSchedules}
        daySchedules={getDaySchedules}
      />
    </div>
  })
  ,[hotSchedule, width])

  const recommendScheduleList = useMemo(() => onGetUserInfo && recommendSchedule?.map(schedule => {
    onSetTargetUserInfo(schedule.userId)
    return <div key={schedule.id} className={ width > 768 ? 'board-item' : 'board-item-mobile'}>
      <ScheduleOverview
        key={schedule.id}
        mainSchedule={schedule}
        subSchedules={getSubSchedules}
        daySchedules={getDaySchedules}
      />
    </div>
  })
  ,[recommendSchedule, width])
  
  return (
    <div>
      <div className="board-template">
        <p className="board-title">인기 계획표</p>
        <div className={'board-form ' + (width < 768 && 'board-form-mobile')}>
          {hotScheduleList}
        </div>
      </div>

      <div className="board-template">
        <p className="board-title">추천 계획표</p>
        <div className={'board-form ' + (width < 768 && 'board-form-mobile')}>
          {recommendScheduleList?.length !== 0 ? recommendScheduleList : hotScheduleList}
        </div>
      </div>
    </div>
  )
}

export default Board