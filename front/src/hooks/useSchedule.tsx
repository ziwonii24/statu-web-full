import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { getDaySchedule, postDaySchedule, putDaySchedule, deleteDaySchedule, DaySchedule } from '../store/daySchedule'
import { getSubSchedule, postSubSchedule, putSubSchedule, deleteSubSchedule, SubSchedule } from '../store/subSchedule'
import { getMainSchedule, postMainSchedule, putMainSchedule, deleteMainSchedule, MainSchedule } from '../store/mainSchedule'
import { RootState } from '../store/reducerIndex'


export function useDaySchedule() {
  // redux
  const dispatch = useDispatch()

  const daySchedule = useSelector((state: RootState) => state.daySchedule).filter(schedule => schedule.id !== 0)
  
  const onGetDaySchedule = useCallback((daySchedules:DaySchedule[]) => dispatch(getDaySchedule(daySchedules)), [dispatch])
  const onPostDaySchedule = useCallback((daySchedule:DaySchedule) => dispatch(postDaySchedule(daySchedule)), [dispatch])
  const onPutDaySchedule = useCallback((daySchedule:DaySchedule) => dispatch(putDaySchedule(daySchedule)), [dispatch])
  const onDeleteDaySchedule = useCallback((id:number) => dispatch(deleteDaySchedule(id)), [dispatch])

  return {
    daySchedule, onGetDaySchedule, onPostDaySchedule, onPutDaySchedule, onDeleteDaySchedule,
  }
}


export function useSubSchedule() {
  const dispatch = useDispatch()

  const subSchedule = useSelector((state: RootState) => state.subSchedule).filter(schedule => schedule.id !== 0)

  const onGetSubSchedule = useCallback((subSchedules:SubSchedule[]) => dispatch(getSubSchedule(subSchedules)), [dispatch])
  const onPostSubSchedule = useCallback((subSchedule:SubSchedule) => dispatch(postSubSchedule(subSchedule)), [dispatch])
  const onPutSubSchedule = useCallback((subSchedule:SubSchedule) => dispatch(putSubSchedule(subSchedule)), [dispatch])
  const onDeleteSubSchedule = useCallback((id:number) => dispatch(deleteSubSchedule(id)), [dispatch])

  return {
    subSchedule, onGetSubSchedule, onPostSubSchedule, onPutSubSchedule, onDeleteSubSchedule,
  }
}


export function useMainSchedule() {
  const dispatch = useDispatch()

  const mainSchedule = useSelector((state: RootState) => state.mainSchedule).filter(schedule => schedule.id !== 0)

  const onGetMainSchedule = useCallback((mainSchedules:MainSchedule[]) => dispatch(getMainSchedule(mainSchedules)), [dispatch])
  const onPostMainSchedule = useCallback((mainSchedule:MainSchedule) => dispatch(postMainSchedule(mainSchedule)), [dispatch])
  const onPutMainSchedule = useCallback((mainSchedule:MainSchedule) => dispatch(putMainSchedule(mainSchedule)), [dispatch])
  const onDeleteMainSchedule = useCallback((id:number) => dispatch(deleteMainSchedule(id)), [dispatch])

  return {
    mainSchedule, onGetMainSchedule, onPostMainSchedule, onPutMainSchedule, onDeleteMainSchedule,
  }
}