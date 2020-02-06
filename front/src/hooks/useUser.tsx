import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { setUserInfo } from '../store/user'
import { RootState } from '../store/reducerIndex'

export default function useUser() {
  const dispatch = useDispatch()

  const getUserInfo = useSelector((state: RootState) => state.user.userInfo)

  const onSetUserInfo = useCallback((userParam) => dispatch(setUserInfo(userParam)), [dispatch])

  return {
    getUserInfo, onSetUserInfo
  }
}