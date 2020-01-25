import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { openModal, closeModal } from '../../store/modal'
import { RootState } from '../../store'

export default function useModal() {
  const dispatch = useDispatch()

  const modalState = useSelector((state: RootState) => state.modal.modalState)
  const onOpenModal = useCallback(() => dispatch(openModal()), [dispatch])
  const onCloseModal = useCallback(() => dispatch(closeModal()), [dispatch])

  return {
    modalState, onOpenModal, onCloseModal
  }
}