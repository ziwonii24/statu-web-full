import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSchedule, makeRepresentSchedule, makePublicSchedule, applyScheuletoMyPlan,
  postMainSchedule, putMainSchedule, deleteMainSchedule, 
  getSubSchedule, postSubSchedule, putSubSchedule, deleteSubSchedule, getSubScheduleOnTarget, 
  postDaySchedule, putDaySchedule, deleteDaySchedule,
  MainSchedule, SubSchedule, DaySchedule, 
} from '../store/schdule'
import { RootState } from '../store'
import dayjs from 'dayjs'


export default function useSchedule() {
  const dispatch = useDispatch()

  const schedules = useSelector((state: RootState) => state.schedule)
  const getMainSchedules = schedules.mainSchedules.filter(schedule => schedule.id !== 0)
  const getSubSchedules = schedules.subSchedules.filter(schedule => schedule.id !== 0)
  const getDaySchedules = schedules.daySchedules.filter(schedule => schedule.id !== 0)

  // get schedule data from db
  const onGetSchedule = useCallback(() => dispatch(getSchedule.request('')), [dispatch])

  // supply imported plan to my plan
  const onApplyScheuletoMyPlan = useCallback((mainSchedule: MainSchedule) => dispatch(applyScheuletoMyPlan.request(mainSchedule)), [dispatch])

  // mainSchedule
  const onPostMainSchedule = useCallback((mainSchedule: MainSchedule) => dispatch(postMainSchedule.request(mainSchedule)), [dispatch])
  const onPutMainSchedule = useCallback((mainSchedule: MainSchedule) => dispatch(putMainSchedule.request(mainSchedule)), [dispatch])
  const onDeleteMainSchedule = useCallback((id: number) => dispatch(deleteMainSchedule.request(id)), [dispatch])
  const onMakeRepresentSchedule = useCallback((id: number) => dispatch(makeRepresentSchedule.request(id)), [dispatch])
  const onMakePublicSchedule = useCallback((id: number) => dispatch(makePublicSchedule.request(id)), [dispatch])

  const onGetMainTerm = useCallback((mainId: number) => {
    let subStartDate: string = dayjs().format('YYYY-MM-DD'); let subEndDate: string = dayjs().format('YYYY-MM-DD')
    let dayStartDate: string = dayjs().format('YYYY-MM-DD'); let dayEndDate: string = dayjs().format('YYYY-MM-DD')
    // console.log('dates', subStartDate, dayStartDate, subEndDate, dayEndDate)
    let mainStartDate: string = ''; let mainEndDate: string = ''

    const targetSubSchedule = getSubSchedules.filter(schedule => schedule.calendarId === mainId && schedule.startDate !== '9999-99-99')
    const targetDaySchedule = getDaySchedules.filter(schedule => schedule.calendarId === mainId)
    // console.log('schedules', subSchedule, targetSubSchedule, targetDaySchedule)
    
    targetSubSchedule.length !== 0 && targetSubSchedule.map(schedule => {
      if (sortDate(subStartDate, schedule.startDate) > 0) {
        subStartDate = schedule.startDate
      }
      if (sortDate(subEndDate, schedule.endDate) < 0) {
        subEndDate = schedule.endDate
      }
    })

    targetDaySchedule.length !== 0 && targetDaySchedule.map(schedule => {
      if (sortDate(dayStartDate, schedule.date) > 0) {
        dayStartDate = schedule.date
      }
      if (sortDate(dayEndDate, schedule.date) < 0) {
        dayEndDate = schedule.date
      }
    })

    if (sortDate(subStartDate, dayStartDate) < 0) {
      mainStartDate = subStartDate
    } else {
      mainStartDate = dayStartDate
    }

    if (sortDate(subEndDate, dayEndDate) > 0) {
      mainEndDate = subEndDate
    } else {
      mainEndDate = dayEndDate
    }

    return {mainStartDate, mainEndDate}
  }, [dispatch])

  // subSchedule
  const onGetSubSchedule = useCallback(() => dispatch(getSubSchedule.request('')), [dispatch])
  const onPostSubSchedule = useCallback((subSchedule: SubSchedule) => dispatch(postSubSchedule.request(subSchedule)), [dispatch])
  const onPutSubSchedule = useCallback((subSchedule: SubSchedule) => dispatch(putSubSchedule.request(subSchedule)), [dispatch])
  const onDeleteSubSchedule = useCallback((id: number) => dispatch(deleteSubSchedule.request(id)), [dispatch])
  const onGetSubScheduleOnTarget = useCallback((id: number) => dispatch(getSubScheduleOnTarget.request(id)), [dispatch])

  // daySchedule
  const onPostDaySchedule = useCallback((daySchedule: DaySchedule) => dispatch(postDaySchedule.request(daySchedule)), [dispatch])
  const onPutDaySchedule = useCallback((daySchedule: DaySchedule) => dispatch(putDaySchedule.request(daySchedule)), [dispatch])
  const onDeleteDaySchedule = useCallback((id: number) => dispatch(deleteDaySchedule.request(id)), [dispatch])

  return {
    onGetSchedule, schedules, getMainSchedules, getSubSchedules, getDaySchedules, onGetSubScheduleOnTarget,
    onPostMainSchedule, onPutMainSchedule, onDeleteMainSchedule, onMakeRepresentSchedule, onMakePublicSchedule, onGetMainTerm,
    onGetSubSchedule, onPostSubSchedule, onPutSubSchedule, onDeleteSubSchedule,
    onPostDaySchedule, onPutDaySchedule, onDeleteDaySchedule
  }
}

function sortDate(first: string, second: string) {
  const [firstYear, firstMonth, firstDay] = first.split('-').map(string => parseInt(string))
  const [secondYear, secondMonth, secondDay] = second.split('-').map(string => parseInt(string))

  if (firstYear < secondYear) {
    return -1
  } else if (firstYear > secondYear) {
    return 1
  } else {
    if (firstMonth < secondMonth) {
      return -1
    } else if (firstMonth > secondMonth) {
      return 1
    } else {
      if (firstDay < secondDay) {
        return -1
      } else if (firstDay > secondDay) {
        return 1
      } else {
        return 0
      }
    }
  }
}