import { mainCategory, subCategory } from '../interfaces/DataSet.interface'

export const mainCategoryData: mainCategory[] = [
  { id: 1, name: '수능 준비' },
  { id: 2, name: '어학' },
]

export const subCategoryData: subCategory[] = [
  { mainId: 1, id: 1, name: '고3' },
  { mainId: 1, id: 2, name: '고2' },
  { mainId: 1, id: 3, name: '고1' },
  { mainId: 1, id: 4, name: 'N수생' },
  { mainId: 2, id: 1, name: '토익' },
  { mainId: 2, id: 2, name: '토스' },
  { mainId: 2, id: 3, name: '오픽' },
  { mainId: 2, id: 4, name: '일본어' },
  { mainId: 2, id: 5, name: '중국어' },
]