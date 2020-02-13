import { MainSchedule, SubSchedule, DaySchedule } from '../../../../store/schedule'

export default interface Component {
  calendarId: number
  targetMonth: string
  targetDateString: string
  handleState: (targetDateString: string) => void
  dayComponent?: object
  mainSchedule: MainSchedule
  subSchedule: SubSchedule[]
  daySchedule: DaySchedule[]
  colorPastDates?: string
  colorActiveDate?: string
  isAscending: boolean
}