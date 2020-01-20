export default interface Component {
  targetDay: number
  title: string
  targetMonth: string
  showMonth: Boolean
  targetDateString: string
  handleState: (targetDay: number, targetDateString: string) => void
  width: string
  onClickDay?: (day: number, dayData: any) => void
  dayComponent?: object
  data?: DataObj[]
  containerClassName: string
  titleContainerClass: string
  monthTitleClass: string
  rowContainerClassName: string
  dayContainerClassName?: string
  daysHeaderContainerClass: string
  dayDataListClass?: string
  daysTitleContainerClass: string
  dayDataListItemClass?: string
  colorPastDates?: string
  colorActiveDate?: string
}

export interface DataObj {
  day: number,
  title: string,
  component?: object
}