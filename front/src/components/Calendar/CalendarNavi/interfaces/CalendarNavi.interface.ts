export default interface Component {
  targetMonth: string;
  onMovePrevMonth: (now: string) => void;
  onMoveNextMonth: (now: string) => void;
}