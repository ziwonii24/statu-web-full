import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { openModal, closeModal, 
  postDayScheduleOnModal, putDayScheduleOnModal, deleteDayScheduleOnModal, 
  postSubScheduleOnModal, putSubScheduleOnModal, deleteSubScheduleOnModal } from '../store/modal'
import { RootState } from '../store/reducerIndex'

export default function useModal() {
  const dispatch = useDispatch()

  const modalState = useSelector((state: RootState) => state.modal.modalState)
  const [ subSchedules, daySchedules ] = useSelector((state: RootState) => state.modal.schedules)
  const onOpenModal = useCallback(([subSchedules, daySchedules]) => dispatch(openModal([subSchedules, daySchedules])), [dispatch])
  const onCloseModal = useCallback(() => dispatch(closeModal()), [dispatch])
  const onPostDayScheduleOnModal = useCallback((daySchedule) => dispatch(postDayScheduleOnModal(daySchedule)), [dispatch])
  const onPutDayScheduleOnModal = useCallback((daySchedule) => dispatch(putDayScheduleOnModal(daySchedule)), [dispatch])
  const onDeleteDayScheduleOnModal = useCallback((id) => dispatch(deleteDayScheduleOnModal(id)), [dispatch])
  const onPutSubScheduleOnModal = useCallback((subSchedule) => dispatch(putSubScheduleOnModal(subSchedule)), [dispatch])
  const onPostSubScheduleOnModal = useCallback((subSchedule) => dispatch(postSubScheduleOnModal(subSchedule)), [dispatch])
  const onDeleteSubScheduleOnModal = useCallback((id) => dispatch(deleteSubScheduleOnModal(id)), [dispatch])

  return {
    modalState, subSchedules, daySchedules, onOpenModal, onCloseModal,
    onPostDayScheduleOnModal, onPutDayScheduleOnModal, onDeleteDayScheduleOnModal, 
    onPutSubScheduleOnModal, onPostSubScheduleOnModal, onDeleteSubScheduleOnModal
  }
}