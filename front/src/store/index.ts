import { combineReducers } from 'redux'
import modal from './modal/index'
import drag from './drag/index'

const rootReducer = combineReducers({
  modal,
  drag
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;