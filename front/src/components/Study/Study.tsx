import React, { FunctionComponent, useMemo } from 'react'
import StudyInfo from './StudyInfo'
import StudyLog from '../StudyLog'
import useUser from '../../hooks/useUser'
import useWindowSize from '../../hooks/useWindowSize'
import { SubSchedule, DaySchedule, MainSchedule } from '../../store/schedule'
import dayjs from 'dayjs'
import './style/Study.scss'
import { Link } from 'react-router-dom'
import { history } from '../../configureStore'

interface Interface {
  getMainSchedules: MainSchedule[]
  getSubSchedules: SubSchedule[]
  getDaySchedules: DaySchedule[]
}

const Study: FunctionComponent<Interface> = (props: Interface) => {
  const { width } = useWindowSize()
  const { getMainSchedules, getSubSchedules, getDaySchedules } = props
  const { onGetUserInfo } = useUser()
  const user = onGetUserInfo
  const myPlanUrl = `/plan/${user?.name}`

  const today = dayjs().format('YYYY-MM-DD')
  const yesterday = dayjs().add(-1, 'day').format('YYYY-MM-DD')

  const myRepresentMainSchedule = user ?
    getMainSchedules.filter(schedule => schedule.userId === user.id && schedule.represent === true) : []
  const mySubSchedule = myRepresentMainSchedule.length ?
    getSubSchedules.filter(schedule => schedule.calendarId === myRepresentMainSchedule[0].id) : []

  const title = useMemo(() => 
    myRepresentMainSchedule.length !== 0 && myRepresentMainSchedule[0].title
  , [myRepresentMainSchedule])

  const yesterdayDaySchedules: DaySchedule[] = []
  const todayDaySchedules: DaySchedule[] = []
  getDaySchedulesData()

  const yesterdaySubSchdulesProps: SubSchedule[] = []
  const todaySubSchdulesProps: SubSchedule[] = []
  let yesterdayDaySchedulesProps: DaySchedule[] = []
  let todayDaySchedulesProps: DaySchedule[] = []
  let yesterdayColors: string[] = []
  let todayColors: string[] = []
  getPropsDatas()

  function getDaySchedulesData() {
    getDaySchedules.map(schedule => {
      if (schedule.date === today) {
        todayDaySchedules.push(schedule)
      } else if (schedule.date === yesterday) {
        yesterdayDaySchedules.push(schedule)
      }
    })
  }

  function getPropsDatas() {
    const yesterdayEtc: DaySchedule[] = []
    const todayEtc: DaySchedule[] = []
    const yesterdayEtcColor: string[] = []
    const todayEtcColor: string[] = []

    mySubSchedule.length && mySubSchedule.map(schedule => {
      if (schedule.startDate !== '9999-99-99') {
        // 어제 날짜에 해당하는 소목표 추가
        if ((dayjs(schedule.startDate).isBefore(dayjs(yesterday)) || dayjs(schedule.startDate).isSame(dayjs(yesterday)))
          && ((dayjs(schedule.endDate).isAfter(dayjs(yesterday)) || dayjs(schedule.endDate).isSame(dayjs(yesterday))))) {
          yesterdaySubSchdulesProps.push(schedule)
        }
        // 오늘 날짜에 해당하는 소목표 추가
        if ((dayjs(schedule.startDate).isBefore(dayjs(today)) || dayjs(schedule.startDate).isSame(dayjs(today)))
          && ((dayjs(schedule.endDate).isAfter(dayjs(today)) || dayjs(schedule.endDate).isSame(dayjs(today))))) {
          todaySubSchdulesProps.push(schedule)
        }
        // 어제 날짜에 해당하는 일일목표 소목표 추가 순서대로 추가
        yesterdayDaySchedules && yesterdayDaySchedules.map(dayschedule => {
          if (dayschedule.subTitleId === schedule.id) {
            yesterdayDaySchedulesProps.push(dayschedule)
            yesterdayColors.push(schedule.color)
          }
        })
        // 오늘 날짜에 해당하는 일일목표 소목표 추가 순서대로 추가
        todayDaySchedules && todayDaySchedules.map(dayschedule => {
          if (dayschedule.subTitleId === schedule.id) {
            todayDaySchedulesProps.push(dayschedule)
            todayColors.push(schedule.color)
          }
        })
        // 기타에 해당하는 일일목표는 따로 추가
      } else {
        yesterdayDaySchedules && yesterdayDaySchedules.map(dayschedule => {
          if (dayschedule.subTitleId === schedule.id) {
            yesterdayEtc.push(dayschedule)
            yesterdayEtcColor.push(schedule.color)
          }
        })
        todayDaySchedules && todayDaySchedules.map(dayschedule => {
          if (dayschedule.subTitleId === schedule.id) {
            todayEtc.push(dayschedule)
            todayEtcColor.push(schedule.color)
          }
        })
      }
    })
    // 기타에 해당하는 항목들의 순서를 뒤로 보내기 위해 병합
    yesterdayDaySchedulesProps = yesterdayDaySchedulesProps.concat(yesterdayEtc)
    todayDaySchedulesProps = todayDaySchedulesProps.concat(todayEtc)
    yesterdayColors = yesterdayColors.concat(yesterdayEtcColor)
    todayColors = todayColors.concat(todayEtcColor)
  }

  const titleClickHandler = () => {
    history.push(myPlanUrl)
  }
  
  return (
    myRepresentMainSchedule.length === 0 ?
    <div className='emptyStudyBox'>
      <Link to={myPlanUrl}>시간표를 추가해주세요!</Link>
    </div>
    :
    <div>
      <div className='studyBox-title' onClick={titleClickHandler}>
        {title}
      </div>
      <div className={'studyBox ' + (width < 768 && 'studyBox-mobile')}>
        { width < 768 && 
          <div className={ width >= 768 ? 'studyBox-right' : 'studyBox-right-mobile'}>
            <p>오늘</p>
            <StudyInfo
              colors={todayColors}
              subSchedules={todaySubSchdulesProps}
              daySchedules={todayDaySchedulesProps}
              studyType='today'
            />
          </div>
        }
        <div className={ width >= 768 ? 'studyBox-left' : 'studyBox-left-mobile'}>
          <p>어제</p>
          <StudyInfo
            colors={yesterdayColors}
            subSchedules={yesterdaySubSchdulesProps}
            daySchedules={yesterdayDaySchedulesProps}
            studyType='yesterday'
          />
        </div>
        { width >= 768 && 
          <div className={ width >= 768 ? 'studyBox-right' : 'studyBox-right-mobile'}>
            <p>오늘</p>
            <StudyInfo
              colors={todayColors}
              subSchedules={todaySubSchdulesProps}
              daySchedules={todayDaySchedulesProps}
              studyType='today'
            />
          </div>
        }        
      </div>
    </div>
  )
}

export default Study
