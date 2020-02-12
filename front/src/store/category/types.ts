import { ActionType } from 'typesafe-actions'
import { setCategoryList } from './actions'
import { CategoryData } from '../../components/User/interfaces/UserInfo.interface'

const categoryActions = { setCategoryList }

export type CategoryAction = ActionType<typeof categoryActions>

export type CategoryState = {
  categoryList: CategoryData[] | null
}