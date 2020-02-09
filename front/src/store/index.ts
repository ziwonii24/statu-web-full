import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import { History } from 'history'
import { RouterState, connectRouter } from 'connected-react-router'
import modal, { ModalState } from './modal'
import drag, { DragState } from './drag'
import schedule, { scheduleSaga, GetSchedulesState } from './schdule'
import user, { UserState } from './user'
import planPage, { PlanPageState } from './planPage'

export function* rootSaga() {
  yield all ([scheduleSaga()])
}

const rootReducer = (history: History) => combineReducers({
  modal,
  drag,
  schedule,
  user,
  planPage,
  router: connectRouter(history),
})

export default rootReducer

// export type RootState = ReturnType<typeof rootReducer>
export type RootState = {
  modal: ModalState
  drag: DragState
  schedule: GetSchedulesState
  user: UserState
  planPage: PlanPageState
  router: RouterState
}