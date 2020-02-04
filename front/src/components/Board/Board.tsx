import React, { FunctionComponent } from 'react'
import './style/Board.scss'

const Board: FunctionComponent = () => {
    return (
      <div>
        <div className="board">
          <p className="boardTitle">인기 계획표</p>
          <br/>
          <p className="contentTitle">게시글1</p>
          <br/>
          <p className="contentTitle">게시글2</p>
          <br/>
        </div>

        <div className="board">
          <p className="boardTitle">실시간 커뮤니티 글</p>
          <br/>
          <p className="contentTitle">게시글1</p>
          <br/>
          <p className="contentTitle">게시글2</p>
          <br/>
        </div>

        <div className="board">
          <p className="boardTitle">공모전 & 스터디</p>
          <br/>
          <p className="contentTitle">게시글1</p>
          <br/>
          <p className="contentTitle">게시글2</p>
          <br/>
        </div>
      </div>
    )
}

export default Board