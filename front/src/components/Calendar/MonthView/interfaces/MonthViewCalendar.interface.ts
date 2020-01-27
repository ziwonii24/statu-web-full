import DataObj from './DataObj.interface'

export default interface Component {
  targetDay: number
  targetMonth: string
  targetDateString: string
  handleState: (targetDay: number, targetDateString: string) => void
  width: string
  dayComponent?: object
  data: DataObj[]
  containerClassName: string
  rowContainerClassName: string
  dayContainerClassName?: string
  daysHeaderContainerClass: string
  dayDataListClass?: string
  daysTitleContainerClass: string
  dayDataListItemClass?: string
  colorPastDates?: string
  colorActiveDate?: string
}