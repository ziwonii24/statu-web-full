import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSchedule, makeRepresentSchedule, undoRepresentSchedule, makePublicSchedule, applyScheduleToMyPlan, getMainTerm,
  postMainSchedule, putMainSchedule, deleteMainSchedule, 
  getSubSchedule, postSubSchedule, putSubSchedule, deleteSubSchedule, getSubScheduleOnTarget, 
  postDaySchedule, putDaySchedule, deleteDaySchedule,
  MainSchedule, SubSchedule, DaySchedule, 
} from '../store/schedule'
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
  const onApplyScheduletoMyPlan = useCallback((mainSchedule: MainSchedule) => dispatch(applyScheduleToMyPlan.request(mainSchedule)), [dispatch])

  // mainSchedule
  const onPostMainSchedule = useCallback((mainSchedule: MainSchedule) => dispatch(postMainSchedule.request(mainSchedule)), [dispatch])
  const onPutMainSchedule = useCallback((mainSchedule: MainSchedule) => dispatch(putMainSchedule.request(mainSchedule)), [dispatch])
  const onDeleteMainSchedule = useCallback((id: number) => dispatch(deleteMainSchedule.request(id)), [dispatch])
  const onMakeRepresentSchedule = useCallback((id: number) => dispatch(makeRepresentSchedule.request(id)), [dispatch])
  const onUndoRepresentSchedule = useCallback((id: number) => dispatch(undoRepresentSchedule.request(id)), [dispatch])
  const onMakePublicSchedule = useCallback((id: number) => dispatch(makePublicSchedule.request(id)), [dispatch])

  const onGetMainTerm = useCallback((id: number) => dispatch(getMainTerm.request(id)), [dispatch])

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
    onGetSchedule, schedules, getMainSchedules, getSubSchedules, getDaySchedules, onGetSubScheduleOnTarget, onApplyScheduletoMyPlan,
    onPostMainSchedule, onPutMainSchedule, onDeleteMainSchedule, onMakeRepresentSchedule, onUndoRepresentSchedule, onMakePublicSchedule, onGetMainTerm,
    onGetSubSchedule, onPostSubSchedule, onPutSubSchedule, onDeleteSubSchedule,
    onPostDaySchedule, onPutDaySchedule, onDeleteDaySchedule
  }
}