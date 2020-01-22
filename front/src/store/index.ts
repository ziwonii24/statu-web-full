import { combineReducers } from 'redux'
import calendar from './calendar/index'
import drag from './drag/index'

const rootReducer = combineReducers({
  calendar,
  drag
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;