import { DaySchedule, SubSchedule } from '../../dataSet/DataSet.interface';

export default interface Component {
  title?: string
  week: string[]
  targetMonth: string
  targetDay: number
  targetDateString: string
  handleState: (targetDay: number, targetDateString: string) => void
  dayComponent?: object
  subSchedule: SubSchedule[]
  daySchedule: DaySchedule[]
  colorPastDates?: string
  colorActiveDate?: string
  isAscending: boolean;
}