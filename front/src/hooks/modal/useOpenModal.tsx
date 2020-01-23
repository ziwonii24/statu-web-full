import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { openModal } from '../../store/modal'

export default function useOpenModal() {
  const dispatch = useDispatch()
  return useCallback(() => dispatch(openModal()), [dispatch])
}