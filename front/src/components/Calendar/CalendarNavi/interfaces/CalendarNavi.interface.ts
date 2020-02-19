import { MouseEvent } from "react";

export default interface Component {
  targetMonth: string;
  onMovePrevMonth: (e: MouseEvent, now: string) => void;
  onMoveNextMonth: (e: MouseEvent, now: string) => void;
  onPage: string
}