import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { setStartDate, setTempDate, setEndDate } from '../../../../store/drag/index'
import { RootState } from '../../../../store/reducerIndex'

export default function useDrag(date: string) {
    const dispatch = useDispatch()

    const dragStart = useCallback(() => dispatch(setStartDate(date)), [dispatch, date])
    const dragOver = useCallback(() => dispatch(setTempDate(date)), [dispatch, date])
    const dragEnd = useCallback(() => dispatch(setEndDate(date)), [dispatch, date])

    const getSelectedDate = useSelector((state: RootState) => state.drag.tempDate)

    return { dragStart, dragOver, dragEnd, getSelectedDate }
}