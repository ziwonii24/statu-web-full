import { SubSchedule } from '../../../../store/subSchedule'
import { DaySchedule } from '../../../../store/daySchedule'

export default interface Component {
  calendarId: number
  date: string
  targetMonth: string
  targetDateString: string
  handleState: (targetDateString: string) => void
  dayComponent?: object
  subScheduleLength: number
  subSchedule: SubSchedule[]
  daySchedule: DaySchedule[]
  colorPastDates?: string;
  colorActiveDate?: string;
  isAscending: boolean;
}
