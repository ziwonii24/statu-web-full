import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { setStartDate, setTempDate, setEndDate } from '../../../../store/drag/index'

export default function useDrag(date: string) {
    const dispatch = useDispatch()

    const dragStart = useCallback(() => dispatch(setStartDate(date)), [dispatch, date])
    const dragOver = useCallback(() => dispatch(setTempDate(date)), [dispatch, date])
    const dragEnd = useCallback(() => dispatch(setEndDate(date)), [dispatch, date])
    
    return { dragStart, dragOver, dragEnd }
}