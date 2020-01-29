import { DaySchedule, SubSchedule } from '../../dataSet/DataSet.interface'

export default interface Component {
  targetDay: number
  targetMonth: string
  targetDateString: string
  handleState: (targetDay: number, targetDateString: string) => void
  width: string
  dayComponent?: object
  subSchedule: SubSchedule[]
  daySchedule: DaySchedule[]
  containerClassName: string
  rowContainerClassName: string
  dayContainerClassName?: string
  daysHeaderContainerClass: string
  dayDataListClass?: string
  daysTitleContainerClass: string
  dayDataListItemClass?: string
  colorPastDates?: string
  colorActiveDate?: string
}