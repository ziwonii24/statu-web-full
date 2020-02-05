import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { setStartDate, setTempDate, setEndDate } from '../store/drag'
import { RootState } from '../store/reducerIndex'

export default function useDrag() {
  const dispatch = useDispatch()

  const startDate = useSelector((state: RootState) => state.drag.startDate)
  const tempDate = useSelector((state: RootState) => state.drag.tempDate)
  const endDate = useSelector((state: RootState) => state.drag.endDate)
  const mouseOverState = useSelector((state: RootState) => state.drag.mouseOverState)

  const onSetStartDate = useCallback((date) => dispatch(setStartDate(date)), [dispatch])
  const onSetTempDate = useCallback((date) => dispatch(setTempDate(date)), [dispatch])
  const onSetEndDate = useCallback((date) => dispatch(setEndDate(date)), [dispatch])

  return {
    startDate, tempDate, endDate, mouseOverState, onSetStartDate, onSetTempDate, onSetEndDate
  }
}