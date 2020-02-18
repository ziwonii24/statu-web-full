import { MainSchedule, SubSchedule, DaySchedule } from '../../../../store/schedule'

export default interface Component {
  calendarId: number
  date: string
  targetMonth: string
  targetDateString: string
  handleState: (targetDateString: string) => void
  dayComponent?: object
  subScheduleLength: number
  mainSchedule: MainSchedule
  subSchedule: SubSchedule[]
  daySchedule: DaySchedule[]
  colorPastDates?: string;
  colorActiveDate?: string;
  isAscending: boolean;
  onPage: string
}
