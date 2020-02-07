import React, { FunctionComponent, useMemo, useEffect } from 'react'
import { useStore } from 'react-redux'
import Calendar from '../Calendar'
import { useMainSchedule, useSubSchedule, useDaySchedule } from '../../hooks/useSchedule'
import useUser from '../../hooks/useUser'
import usePlanPage from '../../hooks/usePlanPage'
import { SubSchedule } from '../../store/subSchedule'

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

import './styles/MyPlan.scss'

dotenv.config({ path: path.join(__dirname, '.env') })
const SERVER_IP = process.env.REACT_APP_TEST_SERVER

interface Interface {
  userName: string | null
}

const MyPlan: FunctionComponent<Interface> = (props: Interface) => {
  const store = useStore()
  console.log(store.getState())

  const {
    userName,
  } = props

  useEffect(() => {
    getUserId()
  }, [])


  const { onGetUserInfo } = useUser()
  const { onGetUserId, onSetUserId } = usePlanPage()
  const { onPostMainSchedule, mainSchedule } = useMainSchedule()
  const { onGetSubSchedule, subSchedule } = useSubSchedule()
  const { daySchedule } = useDaySchedule()
  const userId = onGetUserId
  const renderMainSchedule = onGetUserInfo ?
    (onGetUserInfo.id === userId ?
      mainSchedule.filter(schedule => userId === schedule.userId)
      : mainSchedule.filter(schedule => userId === schedule.userId).filter(schedule => schedule.pb === true))
    : []

  let mainPostResponse: number | null = null; let mainPostLoading: boolean = false; let mainPostError: Error | null = null
  let subGetResponse: SubSchedule[] | null = null; let subGetLoading: boolean = false; let subGetError: Error | null = null

  console.log('mymain', renderMainSchedule)
  console.log('main', mainSchedule)
  console.log('sub', subSchedule)
  console.log('day', daySchedule)
  console.log('getUserInfo', onGetUserInfo)
  console.log('userId', userId)


  // 유저 아이디 가져오기
  async function getUserId() {
    try {
      const response = await axios.get(SERVER_IP + '/user/' + userName)
      onSetUserId(response.data.id)

    }
    catch (e) {
      console.log(e)
    }
  }

  // 캘린더 추가 버튼 
  const handleAddCalendar = () => {
    postMainScheduleData()
    console.log('postMainSchedule')
  }


  // 캘린더 추가 버튼을 눌렀을 때 캘린더 DB와 redux에 추가
  async function postMainScheduleData() {
    if (!userId) return 'null'

    const initialMainSchedule = {
      'id': 0,
      'userId': userId,
      'title': 'default',
      'startDate': '',
      'endDate': '',
      'pb': false,
      'tags': [''],
      'represent': false,
      'category1': [''],
      'category2': ['']
    }

    try {
      const response = await axios.post(SERVER_IP + '/calendar', initialMainSchedule)
      // console.log('response', response)
      mainPostResponse = response.data.id
      mainPostLoading = true
      console.log('success', mainPostResponse)
    }
    catch (e) {
      mainPostError = e
      console.error(mainPostError)
    }
    mainPostLoading = false
    // console.log('post', mainPostResponse)
    if (!mainPostResponse) return 'null'
    // console.log('initial', initialMainSchedule)
    onPostMainSchedule({ ...initialMainSchedule, id: mainPostResponse })
    getSubScheduleData()
  }

  async function getSubScheduleData() {
    try {
      const response = await axios.get(SERVER_IP + '/subtitle')
      subGetResponse = response.data
      subGetLoading = true
      // console.log('success', subGetResponse)
    }
    catch (e) {
      subGetError = e
      console.error(subGetError)
    }
    if (!subGetResponse) return 'null'
    onGetSubSchedule(subGetResponse)
    subGetLoading = false
  }

  // 화면에 렌더링할 컴포넌트 생성
  const AddButton = useMemo(() =>
     <div
        className={`addCalendar`}
        onClick={handleAddCalendar}
      >
        +
      </div>
    , [userId])

  const NullCalendar = useMemo(() => {
    if (renderMainSchedule.length === 0) {
      return <div>시간표를 추가해주세요.</div>
    } else {
      return <div></div>
    }
  }, [renderMainSchedule])

  const RepresentCalendar = useMemo(() =>
    renderMainSchedule && renderMainSchedule.map(schedule => {
      if (schedule.represent === true) {
        return (
          <Calendar
            key={schedule.id}
            calendarId={schedule.id}
            calendarUserId={schedule.userId}
            defaultTitle={schedule.title}
            subSchedule={subSchedule.filter(subItem => schedule.id === subItem.calendarId)}
            daySchedule={daySchedule.filter(dayItem => schedule.id === dayItem.calendarId)}
            represent={true}
            tags={schedule.tags}
          />
        )
      } else {
        return null
      }
    }
    ), [renderMainSchedule])

  const CalendarList = useMemo(() =>
    renderMainSchedule && renderMainSchedule.reverse().map(schedule => {
      if (schedule.represent !== true) {
        return (
          <Calendar
            key={schedule.id}
            calendarId={schedule.id}
            calendarUserId={schedule.userId}
            defaultTitle={schedule.title}
            subSchedule={subSchedule.filter(subItem => schedule.id === subItem.calendarId)}
            daySchedule={daySchedule.filter(dayItem => schedule.id === dayItem.calendarId)}
            represent={false}
            tags={schedule.tags}
          />
        )
      } else {
        return null
      }
    }
    ), [renderMainSchedule])


  return (
    <>
      {(onGetUserInfo && onGetUserInfo.id === userId) && AddButton}
      {(onGetUserInfo && onGetUserInfo.id === userId) && NullCalendar}
      <div className={`RepresentCalendar`}>
        {RepresentCalendar}
      </div>
      <div className={`CalendarList`}>
        {CalendarList}
      </div>

    </>
  )
}

export default MyPlan