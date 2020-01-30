import { ChangeEvent } from "react";

export default interface Interface {
  subTitle: string 
  color: string
  startDate: string
  endDate: string
  handleSubTitle: (e: ChangeEvent<HTMLInputElement>) => void
  handleColor: (color: string) => void
  handleStartDate: (e: ChangeEvent<HTMLInputElement>) => void
  handleEndDate: (e: ChangeEvent<HTMLInputElement>) => void
}