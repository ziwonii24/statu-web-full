import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleIsRunning, setTimeElapsed, setTargetDaySchedule } from '../store/stopWatch'
import { RootState } from '../store'

export default function useStopWatch() {
  const dispatch = useDispatch()

  const isRunning = useSelector((state: RootState) => state.stopWatch.isRunning)
  const timeElapsed = useSelector((state: RootState) => state.stopWatch.timeElapsed)
  const targetId = useSelector((state: RootState) => state.stopWatch.targetDaySchedule)

  const onToggleIsRunning = useCallback(() => dispatch(toggleIsRunning()), [dispatch])
  const onSetTimeElapsed = useCallback((elapsedTime: number) => dispatch(setTimeElapsed(elapsedTime)), [dispatch])
  const onSetTargetDaySchedule = useCallback((scheduleId: number) => dispatch(setTargetDaySchedule(scheduleId)), [dispatch])

  return {
    isRunning, timeElapsed, targetId, onToggleIsRunning, onSetTimeElapsed, onSetTargetDaySchedule
  }
}