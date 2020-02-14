import React, { FunctionComponent, useState, useEffect, useMemo } from 'react'
import {useStore} from 'react-redux'
import Calendar from '../components/Calendar'
import useUser from '../hooks/useUser'
import useSchedule from '../hooks/useSchedule'
import useImportedSchedule from '../hooks/useImportedSchedule'

const StarPage: FunctionComponent = () => {
  // const store = useStore()
  // console.log('store', store.getState())
  const { onGetUserInfo } = useUser()
  const { getMainSchedules, getSubSchedules, getDaySchedules } = useSchedule()
  const { importedSchedules, onGetImportedSchedule } = useImportedSchedule()
  const user = onGetUserInfo

  useEffect(() => {
    if (!user) return
    getMainSchedules !== [] && onGetImportedSchedule(user.id)
  }, [])

  const importedPlanDiv = useMemo(() =>
  importedSchedules && importedSchedules.map(importedSchedule => {
      const importSchedule = getMainSchedules.filter(schedule => schedule.id === importedSchedule.calendarId)[0]
      if (!importSchedule) return

      return (
        <div
          key={importedSchedule.id}
        >
          <Calendar
            calendarId={importSchedule.id}
            importId={importedSchedule.id}
            calendarUserId={importSchedule.userId}
            defaultTitle={importSchedule.title}
            subSchedule={getSubSchedules.filter(subItem => importSchedule.id === subItem.calendarId)}
            daySchedule={getDaySchedules.filter(dayItem => importSchedule.id === dayItem.calendarId)}
            represent={true}
            tags={importSchedule.tags}
            onPage='ImportedPlan'
          />
        </div>
      )
    })
    , [getMainSchedules])

  return (
    <>
      {importedPlanDiv}
    </>
  )
}

export default StarPage