import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { setUserInfo, setTargetUserInfo, clearTargetUserInfo } from '../store/user'
import { RootState } from '../store'


export default function useUser() {
  const dispatch = useDispatch()

  const onGetUserInfo = useSelector((state: RootState) => state.user.userInfo)
  const onGetTargetUserInfo = useSelector((state: RootState) => state.user.targetUserInfo)

  const onSetUserInfo = useCallback((userParam) => dispatch(setUserInfo(userParam)), [dispatch])
  const onSetTargetUserInfo = useCallback((userId) => dispatch(setTargetUserInfo.request(userId)), [dispatch])
  const onClearTargetUserInfo = useCallback(() => dispatch(clearTargetUserInfo()), [dispatch])


  return {
    onGetUserInfo, onSetUserInfo, onSetTargetUserInfo, onGetTargetUserInfo, onClearTargetUserInfo
  }
}