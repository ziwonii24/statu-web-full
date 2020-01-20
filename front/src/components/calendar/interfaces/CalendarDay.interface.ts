import { DataObj } from './Calendar.interface'

export default interface Component {
  day: number;
  targetMonth: string;
  targetDay: number;
  handleState: (data: object) => void;
  onClickDay?: (day: number, dayData: any) => void;
  dayComponent?: object;
  data?: DataObj[]
  // for css 
  dayContainerClassName?: string;
  dayDataListClass?: string;
  dayDataListItemClass?: string;
  daysHeaderContainer?: string;
  colorPastDates?: string;
  colorActiveDate?: string;
}
