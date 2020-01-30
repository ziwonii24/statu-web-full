import { DragState, DragAction } from './types'
import { createReducer } from 'typesafe-actions'
import { SET_STARTDATE, SET_TEMPDATE, SET_ENDDATE } from './actions'

const initialDragState: DragState = {
  startDate: '',
  tempDate: '',
  endDate: '',
}

const drag = createReducer<DragState, DragAction>(initialDragState, {
  [SET_STARTDATE]: (state, action) => ({startDate: state.startDate = action.payload, tempDate: state.tempDate, endDate: state.endDate}),
  [SET_TEMPDATE]: (state, action) => ({startDate: state.startDate, tempDate: state.tempDate = action.payload, endDate: state.endDate}),
  [SET_ENDDATE]: (state, action) => ({startDate: state.startDate, tempDate: state.tempDate, endDate: state.endDate = action.payload})
})

export default drag