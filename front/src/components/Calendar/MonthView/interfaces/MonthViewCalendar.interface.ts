import { DaySchedule, SubSchedule } from '../../dataSet/DataSet.interface'

export default interface Component {
  calendarId: number
  targetMonth: string
  targetDateString: string
  handleState: (targetDateString: string) => void
  dayComponent?: object
  subSchedule: SubSchedule[]
  daySchedule: DaySchedule[]
  colorPastDates?: string
  colorActiveDate?: string
  isAscending: boolean
}