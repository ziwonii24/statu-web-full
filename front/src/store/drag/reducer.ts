import { DragState, DragAction } from './types'
import { createReducer } from 'typesafe-actions'
import { SET_STARTDATE, SET_TEMPDATE, SET_ENDDATE } from './actions'

const initialDragState: DragState = {
  startDate: '',
  tempDate: '',
  endDate: '',
  mouseOverState: false,
}

const drag = createReducer<DragState, DragAction>(initialDragState, {
  [SET_STARTDATE]: ({endDate}, {payload: date}) => ({
    startDate: date, 
    tempDate: date, 
    endDate: endDate, 
    mouseOverState: false
  }),
  [SET_TEMPDATE]: ({startDate, endDate}, {payload: date}) => ({
    startDate: startDate, 
    tempDate: date, 
    endDate: endDate, 
    mouseOverState: true
  }),
  [SET_ENDDATE]: ({startDate, tempDate}, {payload: date}) => ({
    startDate: startDate, 
    tempDate: tempDate, 
    endDate: date, 
    mouseOverState: false
  })
})

export default drag