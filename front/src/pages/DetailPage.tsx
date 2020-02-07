import React, { useMemo } from 'react'
import Calendar from '../components/Calendar'
import { RouteComponentProps } from 'react-router-dom'
import { useMainSchedule, useSubSchedule, useDaySchedule } from '../hooks/useSchedule'
import usePlanPage from '../hooks/usePlanPage'


const DetailPage = (props: RouteComponentProps<{ planId: string }>) => {
    console.log('DetailPage')

    // 넘어온 유저네임에 따라 계획표 넘기기
    const planId = props.match.params.planId
    const { mainSchedule } = useMainSchedule()
    const { subSchedule } = useSubSchedule()
    const { daySchedule } = useDaySchedule()
    const { onSetUserId } = usePlanPage()

    const seletedSchedule = mainSchedule.filter(schedule => schedule.id === parseInt(planId))[0]

    const schedule = useMemo(() =>
        <Calendar
            calendarId={seletedSchedule.id}
            calendarUserId={seletedSchedule.userId}
            defaultTitle={seletedSchedule.title}
            subSchedule={subSchedule.filter(subItem => seletedSchedule.id === subItem.calendarId)}
            daySchedule={daySchedule.filter(dayItem => seletedSchedule.id === dayItem.calendarId)}
            represent={true}
            tags={seletedSchedule.tags}
        />, [planId])

    return schedule
}

export default DetailPage