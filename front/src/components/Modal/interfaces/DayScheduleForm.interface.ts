import { ChangeEvent } from "react";

export default interface Interface {
  date: string
  todo: string
  goal: number
  handleDate: (e: ChangeEvent<HTMLInputElement>) => void
  handleTodo: (e: ChangeEvent<HTMLInputElement>) => void
  handleGoal: (e: ChangeEvent<HTMLInputElement>) => void
}