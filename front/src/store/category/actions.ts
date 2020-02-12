import { createAction } from 'typesafe-actions'
import { CategoryData } from '../../components/User/interfaces/UserInfo.interface'

export const SET_CATEGORYLIST = 'user/SET_CATEGORY_DATA'

export const setCategoryList = createAction(SET_CATEGORYLIST)<CategoryData[]>()