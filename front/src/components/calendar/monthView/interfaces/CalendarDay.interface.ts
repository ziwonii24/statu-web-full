import { DataObj } from './Calendar.interface'

export default interface Component {
  day: number;
  targetMonth: string;
  targetDay: number;
  targetDateString: string;
  handleState: (targetDay: number, targetDateString: string) => void;
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
