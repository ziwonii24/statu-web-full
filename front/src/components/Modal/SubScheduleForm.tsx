import React, { FunctionComponent, MouseEvent, useState, ChangeEvent } from 'react'
import SubScheduleList from './SubScheduleList'
import { colors } from '../Calendar/dataSet/dataSet'
import useModal from '../../hooks/useModal'
import useDrag from '../../hooks/useDrag'
import { useSubSchedule } from '../../hooks/useSchedule'
import { SubSchedule } from '../../store/subSchedule'

import './styles/SubScheduleForm.scss'

const SubScheduleForm: FunctionComponent<{}> = () => {
  // subSchedule set
  const [subTitle, setSubTitle] = useState<string>('')
  const [color, setColor] = useState<string>('#000000')
  const { startDate, endDate, onSetStartDate, onSetEndDate } = useDrag()

  const handleSubTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setSubTitle(e.target.value)
    console.log(e.target.value)
  }
  const handleColor = (color: string) => {
    setColor(color)
    console.log(color)
  }
  const handleStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    onSetStartDate(e.target.value)
    console.log(startDate)
  }
  const handleEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    onSetEndDate(e.target.value)
    console.log(endDate)
  }

  const subSchedule: SubSchedule = {
    "calenderId": 1,
    "id": 0,
    "subTitle": subTitle,
    "color": color,
    "startDate": startDate,
    "endDate": endDate,
  }

  // color dropdown menu
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const handleColorMenu = (e: MouseEvent<HTMLDivElement>) => {
    setShowMenu(!showMenu)
    console.log(e.target)
  }

  // CRUD
  const { onPostSubSchedule } = useSubSchedule()
  const { subSchedules, onPostSubScheduleOnModal, onCloseModal } = useModal()

  console.log(subSchedules)

  const handleSubmit = (schedule: SubSchedule) => {
    onPostSubSchedule(schedule)
    onPostSubScheduleOnModal(schedule)
    console.log(schedule)
  }

  const handleCloseModal = () => {
    onCloseModal()
    onSetStartDate('')
    onSetEndDate('')
  }

  return (
    <div className="content">
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
      <br />
      <input
        type="text"
        placeholder="소목표 입력하세요."
        value={subTitle}
        onChange={handleSubTitle}
      />
      <br/>
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
      <br/>
      <hr/>
      {subSchedules.map(schedule => (
        <SubScheduleList
          key={schedule.id}
          baseCalendarId={schedule.calenderId}
          baseId={schedule.id}
          baseSubTitleId={schedule.subTitle}
          baseColor={schedule.color}
          baseStartDate={schedule.startDate}
          baseEndDate={schedule.endDate}
        />
      ))}
      <div className="button-wrap">
        <div onClick={() => {
          handleCloseModal()
          handleSubmit(subSchedule)
        }}>
          Confirm
          </div>
        <div onClick={handleCloseModal}>Cancel</div>
      </div>
    </div>
  )
}

export default SubScheduleForm