import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { getDaySchedule, postDaySchedule, putDaySchedule, deleteDaySchedule, DaySchedule } from '../store/daySchedule'
import { getSubSchedule, postSubSchedule, putSubSchedule, deleteSubSchedule, SubSchedule } from '../store/subSchedule'
import { RootState } from '../store/reducerIndex'

// import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '.env') })


export function useDaySchedule() {
  const dispatch = useDispatch()

  const allDaySchedule = useSelector((state: RootState) => state.daySchedule)

  const onGetDaySchedule = useCallback((daySchedules:DaySchedule[]) => dispatch(getDaySchedule(daySchedules)), [dispatch])
  const onPostDaySchedule = useCallback((daySchedule:DaySchedule) => dispatch(postDaySchedule(daySchedule)), [dispatch])
  const onPutDaySchedule = useCallback((daySchedule:DaySchedule) => dispatch(putDaySchedule(daySchedule)), [dispatch])
  const onDeleteDaySchedule = useCallback((id:number) => dispatch(deleteDaySchedule(id)), [dispatch])
  
  // 수정 필요
  // const onGetDayScheduleFromDB = async () => {
  //   const SERVER_IP = process.env.REACT_APP_TEST_SERVER

  //   try {
  //     await axios.get(SERVER_IP + '/todo')
  //     console.log('success')
  //   }
  //   catch (e) {
  //     console.error(e)
  //   }
  // }

  return {
    allDaySchedule, onGetDaySchedule, onPostDaySchedule, onPutDaySchedule, onDeleteDaySchedule
  }
}


export function useSubSchedule() {
  const dispatch = useDispatch()

  const allSubSchedule = useSelector((state: RootState) => state.subSchedule)

  const onGetSubSchedule = useCallback((subSchedules:SubSchedule[]) => dispatch(getSubSchedule(subSchedules)), [dispatch])
  const onPostSubSchedule = useCallback((subSchedule:SubSchedule) => dispatch(postSubSchedule(subSchedule)), [dispatch])
  const onPutSubSchedule = useCallback((subSchedule:SubSchedule) => dispatch(putSubSchedule(subSchedule)), [dispatch])
  const onDeleteSubSchedule = useCallback((id:number) => dispatch(deleteSubSchedule(id)), [dispatch])
  
  // 수정 필요
  // const onGetSubScheduleFromDB = async () => {
  //   const SERVER_IP = process.env.REACT_APP_TEST_SERVER

  //   try {
  //     await axios.get(SERVER_IP + '/todo')
  //     console.log('success')
  //   }
  //   catch (e) {
  //     console.error(e)
  //   }
  // }

  return {
    allSubSchedule, onGetSubSchedule, onPostSubSchedule, onPutSubSchedule, onDeleteSubSchedule
  }
}