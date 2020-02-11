import React, { FunctionComponent, useState, useEffect, useMemo } from 'react'
import Calendar from '../components/Calendar'
import useUser from '../hooks/useUser'
import useSchedule from '../hooks/useSchedule'
import usePlanPage from '../hooks/usePlanPage'
import { MainSchedule } from '../store/schdule'
import { history } from '../configureStore';

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '.env') })
const SERVER_IP = process.env.REACT_APP_TEST_SERVER

type importedPlanId = {
  calendarId: number
  id: number
  userId: number
}

const ImportedPlanPage: FunctionComponent = () => {
  const { onGetUserInfo } = useUser()
  const { onGetSchedule, mainSchedule, subSchedule, daySchedule } = useSchedule()
  const { onSetUserId } = usePlanPage()
  const [importedPlanId, setImportedPlanId] = useState<importedPlanId[] | null>(null)
  const user = onGetUserInfo
  // let importedPlanId: importedPlanId[] | null = null

  useEffect(() => {
    mainSchedule !== [] && importPlan()
  }, [])

  const importedPlanDiv = useMemo(() =>
    importedPlanId && importedPlanId.map(importedPlan => {
      console.log('importedPlanId', importedPlanId)
      console.log('mainSchedule', mainSchedule)
      const importedSchedule = mainSchedule.filter(schedule => schedule.id === importedPlan.calendarId)[0]
      console.log('importedSuccess', importedSchedule)
      if (!importedSchedule) return

      const handleClick = async () => {
        try {
          const response = await axios.get(SERVER_IP + '/user/id/' + importedSchedule.userId)
          const user = response.data
          console.log('user', user)
          onSetUserId(user.id)
          history.push(`/plan/${user.name}`)
        }
        catch (e) {
          console.log(e)
        }
      }
      
      return (
        <div
          key={importedSchedule.id}
          onClick={handleClick}
        >
          <Calendar
            calendarId={importedSchedule.id}
            calendarUserId={importedSchedule.userId}
            defaultTitle={importedSchedule.title}
            subSchedule={subSchedule.filter(subItem => importedSchedule.id === subItem.calendarId)}
            daySchedule={daySchedule.filter(dayItem => importedSchedule.id === dayItem.calendarId)}
            represent={true}
            tags={importedSchedule.tags}
          />
        </div>
      )
    })
    , [mainSchedule])

  async function importPlan() {
    if (!user) return
    let response
    try {
      response = await axios.get<importedPlanId[]>(SERVER_IP + '/calendartemp/' + user.id)
      setImportedPlanId(response.data)
      console.log('succeses', response.data)
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {importedPlanDiv}
    </>
  )
}

export default ImportedPlanPage