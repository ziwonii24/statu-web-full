import dayjs from 'dayjs'

// 소목표 주 단위로 자르기
  // 잘라내기

  // 추가하기
  let subDataArray = []





// 달력 만들기
  // 이번달 시작날짜, 이번달의 끝날짜, 이번달 1일의 요일
export const daysArray = (startDayInMonth: dayjs.Dayjs, max: number, start: number) => {
  let arr: string[] = []
  let i: number = 1

  // 저번 달 날짜로 달력 앞칸 매꾸기
  const prevMonthDayCnt = start - 1
  let calendarDay = startDayInMonth.add(-prevMonthDayCnt, 'day')

  for (i = 1; i <= prevMonthDayCnt; i++) {
    arr.push(calendarDay.format('YYYY-MM-DD'))
    calendarDay = calendarDay.add(1, 'day')
  }

  // 이번 달 날짜 채우기
  for (i = 1; i <= max; i++) {
    arr.push(calendarDay.format('YYYY-MM-DD'))
    calendarDay = calendarDay.add(1, 'day')
  }

  i = 1
  while (true) {
    if (arr.length % 7 === 0) {
      break
    }
    arr.push(calendarDay.format('YYYY-MM-DD'))
    calendarDay = calendarDay.add(1, 'day')
  }
  return sliceArray(arr, 7)
}

export const sliceArray = (arr: string[], chunk: number) => {
  let finalArr = []
  let i: number, j: number, tempArray: string[]
  for (i = 0, j = arr.length; i < j; i += chunk) {
    tempArray = arr.slice(i, i + chunk)
    finalArr.push(tempArray)
  }
  return finalArr
}