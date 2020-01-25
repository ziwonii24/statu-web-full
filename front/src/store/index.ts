import { combineReducers } from 'redux'
import modal from './modal'
import drag from './drag'

const rootReducer = combineReducers({
  modal,
  drag
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;