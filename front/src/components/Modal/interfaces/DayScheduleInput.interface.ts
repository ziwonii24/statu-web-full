import { ChangeEvent } from "react";

export default interface Interface {
  color: string
  todo: string
  goal: number
  // handleSubTitleId: (id: number) => void
  handleTodo: (e: ChangeEvent<HTMLInputElement>) => void
  handleGoal: (e: ChangeEvent<HTMLInputElement>) => void
}