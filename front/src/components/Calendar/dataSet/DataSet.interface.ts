export interface MainSchedule {
  id: number
  userId: number
  title: string
  startDate: string  // date인데 test 할 때는 string
  endDate: string
  recommend: number
  view: number
  public: boolean
  progress: number // float type 으로 받아야하는데 float 라이브러리를 쓸 것인지 고민
  tag: Array<string>
  represent: boolean
  category1: Array<number>  // large
  category2: Array<number>  // small
}

// export interface SubSchedule {
//   id: number
//   calendarId: number
//   subTitle: string
//   color: string
//   startDate: string  // date인데 test 할 때는 string
//   endDate: string
// }

export interface DaySchedule {
  calendarId: number,
  subTitleId: number,
  id: number,
  date: string,
  component: string,
  goal: number,  // 시간 분 
  achieve: number,
}