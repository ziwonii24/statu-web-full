import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { closeModal } from '../../store/modal'

export default function useCloseModal() {
  const dispatch = useDispatch()
  return useCallback(() => dispatch(closeModal()), [dispatch])
}