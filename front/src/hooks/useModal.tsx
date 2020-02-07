import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { openModal, closeModal, openDayModal, openSubModal, putDayScheduleOnModal, putSubScheduleOnModal } from '../store/modal'
import { RootState } from '../store'

export default function useModal() {
  const dispatch = useDispatch()

  const modalState = useSelector((state: RootState) => state.modal.modalState)
  const [ subSchedules, subSchedule, daySchedule ] = useSelector((state: RootState) => state.modal.schedules)
  const onOpenModal = useCallback(([subSchedules, subSchedule, daySchedule]) => dispatch(openModal([subSchedules, subSchedule, daySchedule])), [dispatch])
  const onCloseModal = useCallback(() => dispatch(closeModal()), [dispatch])
  const onOpenDayModal = useCallback((subSchedules, daySchedule) => dispatch(openDayModal([subSchedules, daySchedule])), [dispatch])
  const onOpenSubModal = useCallback((subSchedule) => dispatch(openSubModal(subSchedule)), [dispatch])
  const onPutDayScheduleOnModal = useCallback((daySchedule) => dispatch(putDayScheduleOnModal(daySchedule)), [dispatch])
  const onPutSubScheduleOnModal = useCallback((subSchedule) => dispatch(putSubScheduleOnModal(subSchedule)), [dispatch])

  return {
    modalState, subSchedules, subSchedule, daySchedule, 
    onOpenModal, onCloseModal, onOpenDayModal, onOpenSubModal, 
    onPutDayScheduleOnModal, onPutSubScheduleOnModal
  }
}