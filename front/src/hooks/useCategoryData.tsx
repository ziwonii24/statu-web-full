import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { setCategoryList } from '../store/category'
import { RootState } from '../store'
import { CategoryData } from '../components/User/interfaces/UserInfo.interface'

export default function useCategoryData() {
  const dispatch = useDispatch()

  const onGetCategoryList = useSelector((state: RootState) => state.category.categoryList)

  const onSetCategoryList = useCallback((categorysParam: CategoryData[]) => dispatch(setCategoryList(categorysParam)), [dispatch])

  return {
    onGetCategoryList, onSetCategoryList
  }
}