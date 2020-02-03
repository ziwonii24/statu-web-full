import React, { FunctionComponent } from 'react'
import './style/Study.scss'

const Study: FunctionComponent = () => {
    return (
      <div className="study">
          ~공부 현황~
        <br/>
        <div className="studybox">어제 한 공부</div>
        <div className="studybox">오늘 할 공부</div>
      </div>
    )
}

export default Study