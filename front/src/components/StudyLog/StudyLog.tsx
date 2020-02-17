import React, { FunctionComponent } from 'react'

import dayjs from 'dayjs'
import localeDe from "dayjs/locale/ko"

const StudyLog: FunctionComponent = () => {
  const today: dayjs.Dayjs = dayjs().locale(localeDe)
  const dayOfWeek = today.day()
  const startDate = today.add(-dayOfWeek, 'day').add(-52, 'week')
  const weekModuler = 7
  return (
    <>
    </>
  )
}

export default StudyLog