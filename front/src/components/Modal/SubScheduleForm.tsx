import React, { FunctionComponent, MouseEvent, useState, ChangeEvent } from 'react'
import { colors } from '../Calendar/dataSet/dataSet'
import useModal from '../../hooks/useModal'
import useDrag from '../../hooks/useDrag'
import { useSubSchedule } from '../../hooks/useSchedule'
import { SubSchedule } from '../../store/subSchedule'
import axios from 'axios'

import './styles/SubScheduleForm.scss'

const SubScheduleForm: FunctionComponent<{}> = () => {
  const SERVER_IP = process.env.REACT_APP_TEST_SERVER

  let subPostResponse: number | null = null; let subPostLoading: boolean = false; let subPostError: Error | null = null

  const { onPostSubSchedule, onPutSubSchedule } = useSubSchedule()
  const { subSchedule, onCloseModal } = useModal()
  const { onSetStartDate, onSetEndDate} = useDrag()

  const [subTitle, setSubTitle] = useState<string>(subSchedule.subTitle)
  const [color, setColor] = useState<string>(subSchedule.color)
  const [startDate, setStartDate] = useState<string>(subSchedule.startDate)
  const [endDate, setEndDate] = useState<string>(subSchedule.endDate)

  const initialSubSchedule: SubSchedule = {
    "calenderId": subSchedule.calenderId,
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
    console.log(e.target)
  }

  const handleSubmit = (schedule: SubSchedule) => {
    console.log(schedule.id)
    if (schedule.id === 0) {
      postSubScheduleData()
    } else {
      onPutSubSchedule(schedule)
    }
    console.log(schedule)
  }

  const handleCloseModal = () => {
    onCloseModal()
    onSetStartDate('')
    onSetEndDate('')
  }

  async function postSubScheduleData() {
    try {
      const response = await axios.post(SERVER_IP + '/subtitle', initialSubSchedule)
      console.log('response', response)
      subPostResponse = response.data.id
      subPostLoading = true
      console.log('success', subPostResponse)
    }
    catch (e) {
      subPostError = e
      console.error('error', subPostError)
    }
    subPostLoading = false
    if (!subPostResponse) return 'null'
    console.log('post', {...initialSubSchedule, id: subPostResponse})
    onPostSubSchedule({...initialSubSchedule, id: subPostResponse})
  }

  // 함수 결과값 확인
  function postsubScheduleDataResult() {
    if (subPostLoading) return 'loading'
    if (subPostError) return 'error'
    if (!subPostResponse) return 'null'
    // onPostSubSchedule(subPostResponse)
    return 'success'
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