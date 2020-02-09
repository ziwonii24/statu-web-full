import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { getSchedule, postMainSchedule, putMainSchedule, deleteMainSchedule, makeRepresentSchedule, makePublicSchedule,
  postSubSchedule, putSubSchedule, deleteSubSchedule, postDaySchedule, putDaySchedule, deleteDaySchedule, 
  MainSchedule, SubSchedule, DaySchedule } from '../store/schdule'
import { RootState } from '../store'


export default function useSchedule() {
  const dispatch = useDispatch()

  const schedules = useSelector((state: RootState) => state.schedule)
  const mainSchedule = schedules.mainSchedules.filter(schedule => schedule.id !== 0)
  const subSchedule = schedules.subSchedules.filter(schedule => schedule.id !== 0)
  const daySchedule = schedules.daySchedules.filter(schedule => schedule.id !== 0)

  // get schedule data from db
  const onGetSchedule = useCallback(() => dispatch(getSchedule.request('')), [dispatch])

  // mainSchedule
  const onPostMainSchedule = useCallback((mainSchedule:MainSchedule) => dispatch(postMainSchedule(mainSchedule)), [dispatch])
  const onPutMainSchedule = useCallback((mainSchedule:MainSchedule) => dispatch(putMainSchedule(mainSchedule)), [dispatch])
  const onDeleteMainSchedule = useCallback((id:number) => dispatch(deleteMainSchedule(id)), [dispatch])
  const onMakeRepresentSchedule = useCallback((id:number) => dispatch(makeRepresentSchedule(id)), [dispatch])
  const onMakePublicSchedule = useCallback((id:number) => dispatch(makePublicSchedule(id)), [dispatch])

  // subSchedule
  const onPostSubSchedule = useCallback((subSchedule:SubSchedule) => dispatch(postSubSchedule(subSchedule)), [dispatch])
  const onPutSubSchedule = useCallback((subSchedule:SubSchedule) => dispatch(putSubSchedule(subSchedule)), [dispatch])
  const onDeleteSubSchedule = useCallback((id:number) => dispatch(deleteSubSchedule(id)), [dispatch])

  // daySchedule
  const onPostDaySchedule = useCallback((daySchedule:DaySchedule) => dispatch(postDaySchedule(daySchedule)), [dispatch])
  const onPutDaySchedule = useCallback((daySchedule:DaySchedule) => dispatch(putDaySchedule(daySchedule)), [dispatch])
  const onDeleteDaySchedule = useCallback((id:number) => dispatch(deleteDaySchedule(id)), [dispatch])

  return {
    onGetSchedule, schedules, mainSchedule, subSchedule, daySchedule, 
    onPostMainSchedule, onPutMainSchedule, onDeleteMainSchedule, onMakeRepresentSchedule, onMakePublicSchedule,
    onPostSubSchedule, onPutSubSchedule, onDeleteSubSchedule,
    onPostDaySchedule, onPutDaySchedule, onDeleteDaySchedule
  }
}