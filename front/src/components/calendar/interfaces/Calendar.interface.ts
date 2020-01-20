export default interface Component {
  targetDay: number;
  targetMonth : string;
  title?: string;
  showMonth?: boolean;
  handleState?: (data: object) => void;
  onClickDay?: (day: number, dayData: any) => void;
  dayComponent?: object;
  data?: DataObj[];
  width?: string;
  containerClassName? : string;
  rowContainerClassName? : string;
  dayContainerClassName? : string;
  dayDataListClass?: string;
  dayDataListItemClass?: string;
  daysHeaderContainerClass?: string;
  daysTitleContainerClass?: string;
  titleContainerClass?: string;
  monthTitleClass?: string;
  colorPastDates?: string;
  colorActiveDate?: string;
}

export interface DataObj {
  day: number,
  title: string,
  component?: object
}