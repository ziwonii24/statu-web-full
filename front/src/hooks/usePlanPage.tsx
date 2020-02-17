import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { setTargetUser } from '../store/planPage'
import { RootState } from '../store'

export default function usePlanPage() {
  const dispatch = useDispatch()

  const onGetTargetUser = useSelector((state: RootState) => state.planPage.targetUser)
  const onSetTargetUser = useCallback((userParam) => dispatch(setTargetUser(userParam)), [dispatch])

  // 삭제하는 것도 만들자?

  return {
    onGetTargetUser, onSetTargetUser
  }
}