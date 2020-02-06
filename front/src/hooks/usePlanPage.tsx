import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { setUserId } from '../store/planPage'
import { RootState } from '../store/reducerIndex'

export default function usePlanPage() {
  const dispatch = useDispatch()

  const onGetUserId = useSelector((state: RootState) => state.planPage.userId)
  const onSetUserId = useCallback((userParam) => dispatch(setUserId(userParam)), [dispatch])

  // 삭제하는 것도 만들자?

  return {
    onGetUserId, onSetUserId
  }
}