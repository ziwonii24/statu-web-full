import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { History } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes'

import { useMainSchedule, useSubSchedule, useDaySchedule } from './hooks/useSchedule'
import { MainSchedule } from './store/mainSchedule'
import { SubSchedule } from './store/subSchedule'
import { DaySchedule } from './store/daySchedule'

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

import './styles/scss/App.scss'

dotenv.config({ path: path.join(__dirname, '.env') })
const SERVER_IP = process.env.REACT_APP_TEST_SERVER

interface InterFace {
  history: History
}

const App: FunctionComponent<InterFace> = ({history}: InterFace) => {
  console.log('APP')
  let mainGetResponse: MainSchedule[] | null = null; let mainGetLoading: boolean = false; let mainGetError: Error | null = null
  let subGetResponse: SubSchedule[] | null = null; let subGetLoading: boolean = false; let subGetError: Error | null = null
  let dayGetResponse: DaySchedule[] | null = null; let dayGetLoading: boolean = false; let dayGetError: Error | null = null

  const { onGetMainSchedule, onPostMainSchedule, mainSchedule } = useMainSchedule()
  const { onGetSubSchedule, subSchedule } = useSubSchedule()
  const { onGetDaySchedule, daySchedule } = useDaySchedule()

  useEffect(() => {
    getMainScheduleData()
    getSubScheduleData()
    getDayScheduleData()
    console.log('app useEffect')
  },[])
  
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
  return (
    <>
      <ConnectedRouter history={history}>
        { routes }
      </ConnectedRouter>
    </>
  )
}

export default App;
