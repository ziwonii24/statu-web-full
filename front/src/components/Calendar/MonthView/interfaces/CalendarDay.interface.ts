import { DaySchedule, SubSchedule } from '../../dataSet/DataSet.interface'

export default interface Component {
  date: string
  targetMonth: string
  targetDay: number
  targetDateString: string
  handleState: (targetDay: number, targetDateString: string) => void
  dayComponent?: object
  subScheduleLength: number
  subSchedule: SubSchedule[]
  daySchedule: DaySchedule[]
  colorPastDates?: string;
  colorActiveDate?: string;
  isAscending: boolean;
}
