import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { openModal, closeModal, openDayModal, openSubModal, putDayScheduleOnModal, putSubScheduleOnModal } from '../store/modal'
import { RootState } from '../store'

export default function useModal() {
  const dispatch = useDispatch()

  const modalState = useSelector((state: RootState) => state.modal.modalState)
  const [mainSchedule, subSchedules, subSchedule, daySchedule ] = useSelector((state: RootState) => state.modal.schedules)
  const onOpenModal = useCallback((mainSchedule, subSchedules, subSchedule, daySchedule) => dispatch(openModal([mainSchedule, subSchedules, subSchedule, daySchedule])), [dispatch])
  const onCloseModal = useCallback(() => dispatch(closeModal()), [dispatch])
  const onOpenDayModal = useCallback((mainSchedule, subSchedules, daySchedule) => dispatch(openDayModal([mainSchedule, subSchedules, daySchedule])), [dispatch])
  const onOpenSubModal = useCallback((mainSchedule, subSchedule) => dispatch(openSubModal([mainSchedule, subSchedule])), [dispatch])
  const onPutDayScheduleOnModal = useCallback((daySchedule) => dispatch(putDayScheduleOnModal(daySchedule)), [dispatch])
  const onPutSubScheduleOnModal = useCallback((subSchedule) => dispatch(putSubScheduleOnModal(subSchedule)), [dispatch])

  return {
    modalState, mainSchedule, subSchedules, subSchedule, daySchedule, 
    onOpenModal, onCloseModal, onOpenDayModal, onOpenSubModal, 
    onPutDayScheduleOnModal, onPutSubScheduleOnModal
  }
}