import { DaySchedule, SubSchedule } from '../../dataSet/DataSet.interface'

export default interface Component {
  date: string
  targetMonth: string
  targetDateString: string
  handleState: (targetDateString: string) => void
  dayComponent?: object
  subScheduleLength: number
  subSchedule: SubSchedule[]
  daySchedule: DaySchedule[]
  // for css 
  dayContainerClassName?: string;
  dayDataListClass?: string;
  dayDataListItemClass?: string;
  daysHeaderContainer?: string;
  colorPastDates?: string;
  colorActiveDate?: string;
  isAscending: boolean;
}
