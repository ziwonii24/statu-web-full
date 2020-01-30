import React, { FunctionComponent, ChangeEvent, MouseEvent, useState } from 'react'
import Interface from './interfaces/SubScheduleForm.interface'
import { colors } from '../Calendar/dataSet/dataSet'

import './styles/SubScheduleForm.scss'

interface Props {
  subTitle: string
  color: string
  startDate: string
  endDate: string
  handleSubTitle: (e: ChangeEvent<HTMLInputElement>) => void
  handleColor: (color: string) => void
  handleStartDate: (e: ChangeEvent<HTMLInputElement>) => void
  handleEndDate: (e: ChangeEvent<HTMLInputElement>) => void
}

const SubScheduleForm: FunctionComponent<Interface> = (props: Props) => {
  const {
    subTitle,
    color,
    startDate,
    endDate,
    handleSubTitle,
    handleColor,
    handleStartDate,
    handleEndDate,
  } = props

  const [showMenu, setShowMenu] = useState<boolean>(false)
  const handleColorMenu = (e: MouseEvent<HTMLDivElement>) => {
    setShowMenu(!showMenu)
    console.log(e.target)
  }

  return (
    <div className="content">
      <input
        type="text"
        placeholder="소목표 입력하세요."
        value={subTitle}
        onChange={handleSubTitle}
      /> <br />

      <div
        className={`colorContainer`}
        onClick={handleColorMenu}
        style={{ backgroundColor: color }}
      >
      </div >
      {showMenu ?
        colors.map(color => (
          <div
            key={color}
            className={`colorContainer`}
            style={{ backgroundColor: color }}
            onClick={() => {
              handleColor(color)
              setShowMenu(!showMenu)
            }}
          >
          </div>
        ))
        :
        ''
      }

      <input
        type="date"
        placeholder="시작일자를 선택하세요."
        value={startDate}
        onChange={handleStartDate}
      />
      <input
        type="date"
        placeholder="종료일자를 선택하세요."
        value={endDate}
        onChange={handleEndDate}
      />
    </div>
  )
}

export default SubScheduleForm