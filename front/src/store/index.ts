import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import { History } from 'history'
import { RouterState, connectRouter } from 'connected-react-router'
import modal, { ModalState } from './modal'
import drag, { DragState } from './drag'
import schedule, { scheduleSaga, SchedulesState } from './schedule'
import importedPlan, { ImportedScheduleSaga, ImportedSchedulesState} from './importedPlan'
import user, { UserState } from './user'
import planPage, { PlanPageState } from './planPage'
import stopWatch, { StopWatchState } from './stopWatch'
import category, { CategoryState } from './category'

export function* rootSaga() {
  yield all ([scheduleSaga(), ImportedScheduleSaga()])
}

const rootReducer = (history: History) => combineReducers({
  modal,
  drag,
  schedule,
  importedPlan,
  user,
  planPage,
  stopWatch,
  category,
  router: connectRouter(history),
})

export default rootReducer

// export type RootState = ReturnType<typeof rootReducer>
export type RootState = {
  modal: ModalState
  drag: DragState
  schedule: SchedulesState
  importedPlan: ImportedSchedulesState
  user: UserState
  planPage: PlanPageState
  stopWatch: StopWatchState
  category: CategoryState
  router: RouterState
}