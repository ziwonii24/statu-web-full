import React, { FunctionComponent, MouseEvent, useState, ChangeEvent } from 'react'
import { colors } from '../Calendar/dataSet/dataSet'
import useModal from '../../hooks/useModal'
import useDrag from '../../hooks/useDrag'
import useSchedule from '../../hooks/useSchedule'
import { SubSchedule } from '../../store/schdule'

import dayjs from 'dayjs'

import './styles/SubScheduleForm.scss'


const SubScheduleForm: FunctionComponent<{}> = () => {

  const { onPutMainSchedule, onPostSubSchedule, onPutSubSchedule } = useSchedule()
  const { mainSchedule, subSchedule, onCloseModal } = useModal()
  const { onSetStartDate, onSetEndDate} = useDrag()

  const [subTitle, setSubTitle] = useState<string>(subSchedule.subTitle)
  const [hasTitle, setHasTitle] = useState<boolean>(true)
  const [color, setColor] = useState<string>(subSchedule.id !== 0 ? subSchedule.color : colors[0])
  const [startDate, setStartDate] = useState<string>(subSchedule.startDate)
  const [endDate, setEndDate] = useState<string>(subSchedule.endDate)

  const initialSubSchedule: SubSchedule = {
    "calendarId": subSchedule.calendarId,
    "id": subSchedule.id,
    "subTitle": subTitle,
    "color": color,
    "startDate": startDate,
    "endDate": endDate,
  }

  const handleSubTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setSubTitle(e.target.value)
    if (e.target.value === '') {
      setHasTitle(false)
    } else {
      setHasTitle(true)
    }
  }
  const handleColor = (color: string) => {
    setColor(color)
    // console.log(color)
  }
  const handleStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value)
    // console.log(startDate)
  }
  const handleEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value)
    // console.log(endDate)
  }

  // color dropdown menu
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const handleColorMenu = (e: MouseEvent<HTMLDivElement>) => {
    setShowMenu(!showMenu)
    // console.log(e.target)
  }

  const handleSubmit = (schedule: SubSchedule) => {
    // console.log(schedule.id)
    if (subTitle === '') {
      return
    }
    if (schedule.id === 0) {
      onPostSubSchedule(initialSubSchedule)
      putMainSchedule()
    } else {
      onPutSubSchedule(initialSubSchedule)
      putMainSchedule()
    }
    handleCloseModal()
    // console.log(schedule)
  }

  const handleCloseModal = () => {
    onCloseModal()
    onSetStartDate('')
    onSetEndDate('')
  }

  function putMainSchedule() {
    let edited = false
    if (mainSchedule.startDate === '' || dayjs(mainSchedule.startDate) > dayjs(initialSubSchedule.startDate)) {
      mainSchedule.startDate = initialSubSchedule.startDate
      edited = true
    }
    if (mainSchedule.endDate === '' || dayjs(mainSchedule.endDate) < dayjs(initialSubSchedule.endDate)) {
      mainSchedule.endDate = initialSubSchedule.endDate
      edited = true
    }
    if (!edited) return
    onPutMainSchedule(mainSchedule)
  }

  // 상호작용을 위한 변수
  const isValidInput = hasTitle ? 'validInputBar' : 'invalidInputBar'

  return (
    <div className="content">
      <div
        className={`colorContainer`}
        onClick={handleColorMenu}
        style={{ backgroundColor: color, marginRight: `${1.5}vh` }}
      />
      {showMenu ?
        colors.map(colorIncolors => {
          if (colorIncolors !== color) {
            return (
              <div
                key={colorIncolors}
                className={`colorContainer`}
                style={{ backgroundColor: colorIncolors }}
                onClick={() => {
                  handleColor(colorIncolors)
                  setShowMenu(!showMenu)
                }}
              />
            )
          }
        })
        :
        ''
      }
      <br />
      <input
        type="text"
        className={`inputBar ${isValidInput}`}
        placeholder={hasTitle ? '' : '목표를 입력해주세요!'}
        value={subTitle}
        onChange={handleSubTitle}
      />
      <br/>
      <input
        type="date"
        className={`inputBar`}
        placeholder="시작일자를 선택하세요."
        value={startDate}
        onChange={handleStartDate}
      />
      <input
        type="date"
        className={`inputBar`}
        placeholder="종료일자를 선택하세요."
        value={endDate}
        onChange={handleEndDate}
      />
      <div className="button-wrap">
        <div onClick={() => {
          handleSubmit(initialSubSchedule)
        }}>
          Confirm
          </div>
        <div onClick={handleCloseModal}>Cancel</div>
      </div>
    </div>
  )
}

export default SubScheduleForm