import { combineReducers } from 'redux'
import { History } from 'history'
import { RouterState, connectRouter } from 'connected-react-router'
import modal, { ModalState } from './modal'
import drag, { DragState } from './drag'
import daySchedule, { DaySchedulesState } from './daySchedule'
import subSchedule, { SubSchedulesState } from './subSchedule'
import mainSchedule, { MainSchedulesState } from './mainSchedule'

import auth from './auth';
// import user, { userSaga } from '../store/auth/user';
// import loading from './auth/loading'

const rootReducer = (history: History) => combineReducers({
  auth,
  user,
  loading,
  
  modal,
  drag,
  daySchedule,
  subSchedule,
  mainSchedule,
  router: connectRouter(history),
})

export default rootReducer

// export type RootState = ReturnType<typeof rootReducer>
export type RootState = {
  modal: ModalState
  drag: DragState
  daySchedule: DaySchedulesState
  subSchedule: SubSchedulesState
  mainSchedule: MainSchedulesState
  router: RouterState
}