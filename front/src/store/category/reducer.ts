import { CategoryState, CategoryAction } from './types'
import { createReducer } from 'typesafe-actions'
import { SET_CATEGORYLIST } from './actions'

const initialCategoryState: CategoryState = {
  categoryList: null,
}

const categorys = createReducer<CategoryState, CategoryAction>(initialCategoryState, {
  [SET_CATEGORYLIST]: (state, action) => ({
    categoryList: action.payload
  }),
})

export default categorys