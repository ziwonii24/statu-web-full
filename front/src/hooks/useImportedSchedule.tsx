import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { getImportedSchedule, postImportedSchedule, deleteImportedSchedule, ImportedSchedule } from '../store/importedPlan'
import { RootState } from '../store'

export default function useModal() {
  const dispatch = useDispatch()

  const importedSchedules = useSelector((state: RootState) => state.importedPlan)
  const onGetImportedSchedule = useCallback((id: number) => dispatch(getImportedSchedule.request(id)), [dispatch])
  const onPostImportedSchedule = useCallback((schedule: ImportedSchedule) => dispatch(postImportedSchedule.request(schedule)), [dispatch])
  const onDeleteImportedSchedule = useCallback((id: number) => dispatch(deleteImportedSchedule.request(id)), [dispatch])

  return {
    importedSchedules, onGetImportedSchedule, onPostImportedSchedule, onDeleteImportedSchedule
  }
}