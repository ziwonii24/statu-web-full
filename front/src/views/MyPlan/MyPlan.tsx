import React, { FunctionComponent, useMemo } from 'react'
import Calendar from '../../components/Calendar'
import { useMainSchedule, useSubSchedule, useDaySchedule } from '../../hooks/useSchedule'
import useUser from '../../hooks/useUser'
import { MainSchedule } from '../../store/mainSchedule'
import { SubSchedule } from '../../store/subSchedule'
import { DaySchedule } from '../../store/daySchedule'

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

import './styles/MyPlan.scss'

dotenv.config({ path: path.join(__dirname, '.env') })


const MyPlan: FunctionComponent = () => {
  console.log('myplan')
  const { getUserInfo } = useUser()
  const { onGetMainSchedule, onPostMainSchedule, mainSchedule } = useMainSchedule()
  const { onGetSubSchedule, subSchedule } = useSubSchedule()
  const { onGetDaySchedule, daySchedule } = useDaySchedule()

  const SERVER_IP = process.env.REACT_APP_TEST_SERVER
  let mainGetResponse: MainSchedule[] | null = null; let mainGetLoading: boolean = false; let mainGetError: Error | null = null
  let subGetResponse: SubSchedule[] | null = null; let subGetLoading: boolean = false; let subGetError: Error | null = null
  let dayGetResponse: DaySchedule[] | null = null; let dayGetLoading: boolean = false; let dayGetError: Error | null = null
  let mainPostResponse: number | null = null; let mainPostLoading: boolean = false; let mainPostError: Error | null = null

  const myMainSchedule = getUserInfo ? mainSchedule.filter(schedule => getUserInfo.id === schedule.userId) : []

  console.log('mymain', myMainSchedule)
  console.log('main', mainSchedule)
  console.log('sub', subSchedule)
  console.log('day', daySchedule)
  console.log('getUserInfo', getUserInfo)

  const initialMainSchedule = {
    'id': 0,
    'userId': getUserInfo ? getUserInfo.id : 0,
    'title': 'default',
    'startDate': '',
    'endDate': '',
    'pb': false,
    'tags': [''],
    'represent': false,
    'category1': [''],
    'category2': ['']
  }

  const handleAddCalendar = () => {
    postMainScheduleData()
    console.log('postMainSchedule')
  }

  // 임시 함수
  const handleGetCalendar = async () => {
    await getMainScheduleData()
    await getSubScheduleData()
    await getDayScheduleData()
  }

  // DB의 캘린더 정보를 redux에 추가
  async function getMainScheduleData() {
    try {
      const response = await axios.get(SERVER_IP + '/calendar')
      mainGetResponse = response.data
      mainGetLoading = true
      // console.log('success', mainGetResponse)
    }
    catch (e) {
      mainGetError = e
      console.error(mainGetError)
    }
    if (!mainGetResponse) return 'null'
    onGetMainSchedule(mainGetResponse)
    // console.log('get', mainGetResponse)
    mainGetLoading = false
  }

  // DB의 소목표 정보를 redux에 추가
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

  // DB의 일일목표 정보를 redux에 추가
  async function getDayScheduleData() {
    try {
      const response = await axios.get(SERVER_IP + '/todo')
      dayGetResponse = response.data
      dayGetLoading = true
      // console.log('success', dayGetResponse)
    }
    catch (e) {
      dayGetError = e
      console.error(dayGetError)
    }
    if (!dayGetResponse) return 'null'
    onGetDaySchedule(dayGetResponse)
    dayGetLoading = false
  }

  // 캘린더 추가 버튼을 눌렀을 때 캘린더 DB와 redux에 추가
  async function postMainScheduleData() {
    if (!getUserInfo) return 'null'
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
    console.log('initial', initialMainSchedule)
    onPostMainSchedule({...initialMainSchedule, id: mainPostResponse})
  }

  // 화면에 렌더링할 컴포넌트 생성
  const RepresentCalendar = useMemo(() =>
  myMainSchedule && myMainSchedule.map(schedule => {
      if (schedule.represent === true) {
        return (
          <Calendar
            key={schedule.id}
            calendarId={schedule.id}
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
  ), [myMainSchedule])

  const CalendarList = useMemo(() =>
  myMainSchedule && myMainSchedule.reverse().map(schedule => {
      if (schedule.represent !== true) {
        return (
          <Calendar
            key={schedule.id}
            calendarId={schedule.id}
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
  ), [myMainSchedule])

  const NullCalendar = useMemo(() => {
    if (myMainSchedule.length === 0) {
      return <div>시간표를 추가해주세요.</div>
    } else {
      return <div></div>
    }
  }, [myMainSchedule])


  return (
    <>
      <div
        className={`addCalendar`}
        onClick={handleAddCalendar}
      >
        +
      </div>
      {/* 임시 */}
      <div
        className={`addCalendar`}
        onClick={handleGetCalendar}
      >
        get
      </div>
      {NullCalendar}
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