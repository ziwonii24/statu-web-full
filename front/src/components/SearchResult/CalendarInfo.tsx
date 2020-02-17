import React, { FunctionComponent } from 'react'
import { MainSchedule } from '../../store/schedule'
import useSchedule from '../../hooks/useSchedule'
import useUser from '../../hooks/useUser'
import { history } from '../../configureStore'

interface Interface {
  mainSchedule: MainSchedule
}
const CalendarInfo: FunctionComponent<Interface> = (props: Interface) => {
  const { mainSchedule, } = props
  const { onPutMainSchedule } = useSchedule()
  const { onGetTargetUserInfo } = useUser()

  const userInfo = onGetTargetUserInfo && onGetTargetUserInfo.filter(userInfo => userInfo.id === mainSchedule.userId)[0]

  const handleDetailPage = async (schedule: MainSchedule) => {
    const editedSchedule = {...schedule, view: schedule.view + 1}
    // console.log('edit', editedSchedule)
    // 검색결과에서 클릭 할 때마다 view + 1
    console.log('detail click le go')
    onPutMainSchedule(editedSchedule)
    history.push(`/detail/${mainSchedule.id}`)
  }

  return (
    <div
      onClick={() => handleDetailPage(mainSchedule)}
    >
      <div>{mainSchedule.title}</div>
      <div>{mainSchedule.startDate} {mainSchedule.endDate}</div>
      <div>{mainSchedule.tags}</div>
      <div>{mainSchedule.view} {mainSchedule.recommend}</div>
    </div>
  )
}

export default CalendarInfo