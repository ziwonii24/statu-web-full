import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { setStartDate, setTempDate, setEndDate } from '../store/drag'
import { RootState } from '../store/reducerIndex'

export default function useModal() {
  const dispatch = useDispatch()

  const startDate = useSelector((state: RootState) => state.drag.startDate)
  const tempDate = useSelector((state: RootState) => state.drag.tempDate)
  const endDate = useSelector((state: RootState) => state.drag.endDate)

  const onSetStartDate = useCallback((date) => dispatch(setStartDate(date)), [dispatch])
  const onSetTempDate = useCallback((date) => dispatch(setTempDate(date)), [dispatch])
  const onSetEndDate = useCallback((date) => dispatch(setEndDate(date)), [dispatch])

  return {
    startDate, tempDate, endDate, onSetStartDate, onSetTempDate, onSetEndDate
  }
}