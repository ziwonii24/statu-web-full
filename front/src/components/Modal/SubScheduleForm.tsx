import React, { FunctionComponent, MouseEvent, useState, ChangeEvent } from 'react'
import { colors } from '../Calendar/dataSet/dataSet'
import useModal from '../../hooks/useModal'
import useDrag from '../../hooks/useDrag'
import useSchedule from '../../hooks/useSchedule'
import { SubSchedule } from '../../store/schdule'
import axios from 'axios'

import './styles/SubScheduleForm.scss'

const SubScheduleForm: FunctionComponent<{}> = () => {
  const SERVER_IP = process.env.REACT_APP_TEST_SERVER

  let subPostResponse: number | null = null; let subPostLoading: boolean = false; let subPostError: Error | null = null
  let subPutResponse: number | null = null; let subPutLoading: boolean = false; let subPutError: Error | null = null

  const { onPostSubSchedule, onPutSubSchedule } = useSchedule()
  const { subSchedule, onCloseModal } = useModal()
  const { onSetStartDate, onSetEndDate} = useDrag()


  const [subTitle, setSubTitle] = useState<string>(subSchedule.subTitle)
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
    // console.log(e.target.value)
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
    if (schedule.id === 0) {
      postSubScheduleData()
    } else {
      putSubScheduleData()
    }
    // console.log(schedule)
  }

  const handleCloseModal = () => {
    onCloseModal()
    onSetStartDate('')
    onSetEndDate('')
  }

  async function postSubScheduleData() {
    try {
      const response = await axios.post(SERVER_IP + '/subtitle', initialSubSchedule)
      // console.log('response', response)
      subPostResponse = response.data.id
      subPostLoading = true
      // console.log('success', subPostResponse)
    }
    catch (e) {
      subPostError = e
      // console.error('error', subPostError)
    }
    subPostLoading = false
    if (!subPostResponse) return 'null'
    onPostSubSchedule({...initialSubSchedule, id: subPostResponse})
  }

  async function putSubScheduleData() {
    try {
      const response = await axios.put(SERVER_IP + '/subtitle', initialSubSchedule)
      // console.log('response', response)
      subPutResponse = response.data
      subPutLoading = true
      // console.log('success', subPutResponse)
    }
    catch (e) {
      subPutError = e
      // console.error('error', subPutError)
    }
    subPutLoading = false
    if (!subPutResponse) return 'null'
    // console.log('post', {...initialSubSchedule, id: subPostResponse})
    onPutSubSchedule(initialSubSchedule)
  }

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
      <div className="button-wrap">
        <div onClick={() => {
          handleCloseModal()
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