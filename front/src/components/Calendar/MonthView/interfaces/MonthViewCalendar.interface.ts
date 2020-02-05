import { SubSchedule } from '../../../../store/subSchedule'
import { DaySchedule } from '../../../../store/daySchedule'


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