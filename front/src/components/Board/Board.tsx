import React, { FunctionComponent, useMemo } from 'react'
import useSchedule from '../../hooks/useSchedule'
import useUser from '../../hooks/useUser'
import './style/Board.scss'

const Board: FunctionComponent = () => {
  const { getMainSchedules } = useSchedule()
  const { onGetUserInfo } = useUser()

  const hotSchedule = useMemo(() => getMainSchedules.sort(function (a, b) {
    if (a.view > b.view) {
      return -1
    } else if (a.view === b.view && a.recommend >= b.recommend) {
      return -1
    } else {
      return 1
    }
  }).splice(0, 3)
  ,[getMainSchedules]) 

  const recommendSchedule = useMemo(() => onGetUserInfo && getMainSchedules.filter(schedule => 
    onGetUserInfo.category2.map(categoryName => schedule.category2.includes(categoryName)).includes(true))  // 카테고리가 하나라도 일치하면 true
    .sort(function (a, b) {
      if (a.view > b.view) {
        return -1
      } else if (a.view === b.view && a.recommend >= b.recommend) {
        return -1
      } else {
        return 1
      }
    })
    .splice(0, 3)
  ,[getMainSchedules]) 

    console.log(hotSchedule, recommendSchedule)
  return (
    <div>
      <div className="board">
        <p className="boardTitle">추천 계획표</p>
        <br />
        <p className="contentTitle">게시글1</p>
        <br />
        <p className="contentTitle">게시글2</p>
        <br />
      </div>

      <div className="board">
        <p className="boardTitle">인기 계획표</p>
        <br />
        <p className="contentTitle">게시글1</p>
        <br />
        <p className="contentTitle">게시글2</p>
        <br />
      </div>
    </div>
  )
}

export default Board