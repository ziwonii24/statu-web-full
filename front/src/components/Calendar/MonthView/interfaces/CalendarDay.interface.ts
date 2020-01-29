import { DaySchedule, SubSchedule } from '../../dataSet/DataSet.interface'

export default interface Component {
  date: string
  targetMonth: string
  targetDay: number
  targetDateString: string
  handleState: (targetDay: number, targetDateString: string) => void
  dayComponent?: object
  subSchedule: SubSchedule[]
  daySchedule: DaySchedule[]
  // for css 
  dayContainerClassName?: string
  dayDataListClass?: string
  dayDataListItemClass?: string
  daysHeaderContainer?: string
  colorPastDates?: string
  colorActiveDate?: string
}
