import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { setUserInfo } from '../store/user'
import { RootState } from '../store/reducerIndex'

export default function useUser() {
  const dispatch = useDispatch()

  const onGetUserInfo = useSelector((state: RootState) => state.user.userInfo)

  const onSetUserInfo = useCallback((userParam) => dispatch(setUserInfo(userParam)), [dispatch])

  // 삭제하는 것도 만들자?

  return {
    onGetUserInfo, onSetUserInfo
  }
}