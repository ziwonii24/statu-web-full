import { DataObj } from './Calendar.interface';

export default interface Component {
  title?: string;
  week: number[];
  targetMonth: string;
  targetDay: number;
  // targetDateString: string;
  handleState: (data: object) => void;
  onClickDay?: (day: number, dayData: any) => void;
  dayComponent?: object;
  data?: DataObj[];
  rowContainerClassName? : string;
  dayContainerClassName? : string;
  dayDataListClass?: string;
  dayDataListItemClass?: string;
  colorPastDates?: string;
  colorActiveDate?: string;
}