export interface MainSchedule {
  id: string
  userId: string
  title: string
  startDate: string  // date인데 test 할 때는 string
  endDate: string
  recommend: number
  view: number
  public: boolean
  progress: number // float type 으로 받아야하는데 float 라이브러리를 쓸 것인지 고민
  tag: Array<string>
  represent: boolean
  category1: Array<object>  // large
  category2: Array<object>  // small
}

export interface SubSchedule {
  id: string
  calenderId: string
  subTitle: string
  color: string
  startDate: string  // date인데 test 할 때는 string
  endDate: string
}

export interface DaySchedule {
  calendarId: string,
  subTitleId: string,
  id: string,
  date: string,
  component: string,
  goal: number,  // 시간 분 
  achieve: number,
}