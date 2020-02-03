import React, { FunctionComponent, useState, ChangeEvent, MouseEvent } from 'react'
import Interface from './interfaces/SubScheduleList.interface'
import { colors } from '../Calendar/dataSet/dataSet'
import { SubSchedule } from '../Calendar/dataSet/DataSet.interface'
import { useSubSchedule } from '../../hooks/useSchedule'
import useModal from '../../hooks/useModal'

const DayScheduleList: FunctionComponent<Interface> = (props: Interface) => {
  const {
    baseCalendarId,
    baseId,
    baseSubTitleId,
    baseColor,
    baseStartDate,
    baseEndDate,
  } = props

  const [subTitle, setSubTitle] = useState<string>(baseSubTitleId)
  const [color, setColor] = useState<string>(baseColor)
  const [startDate, setStartDate] = useState<string>(baseStartDate)
  const [endDate, setEndDate] = useState<string>(baseEndDate)

  const subSchedule: SubSchedule = {
    "calenderId": baseCalendarId,
    "id": baseId,
    "subTitle": subTitle,
    "color": color,
    "startDate": startDate,
    "endDate": endDate,
  }

  const handleSubTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setSubTitle(e.target.value)
    console.log('handleSubTitle', e.target.value)
  }
  const handleColor = (color: string) => {
    setColor(color)
    console.log(color)
  }
  const handleStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value)
    console.log('handleStartDate', e.target.value)
  }
  const handleEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value)
    console.log('handleEndDate', e.target.value)
  }

  const { onPutSubSchedule, onDeleteSubSchedule } = useSubSchedule()
  const { onPutSubScheduleOnModal, onDeleteSubScheduleOnModal } = useModal()

  const handleEdit = (schedule: SubSchedule) => {
    onPutSubSchedule(schedule)
    onPutSubScheduleOnModal(schedule)
    console.log(schedule)
  }

  const handleDelete = (id: number) => {
    onDeleteSubSchedule(id)
    onDeleteSubScheduleOnModal(id)
    console.log(id)
  }

  const [showMenu, setShowMenu] = useState<boolean>(false)
  const handleColorMenu = (e: MouseEvent<HTMLDivElement>) => {
    setShowMenu(!showMenu)
    console.log(e.target)
  }

  return (
    <div>
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
      <br />
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

export default DayScheduleList