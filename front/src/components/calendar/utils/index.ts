import dayjs from 'dayjs'

export const dayOfWeek = (date: string): number => {
  const rawDay = dayjs(date).day()  // targetMonth 의 시작인 무슨 요일인지 
  if (rawDay === 7) return 1;
  else return rawDay + 1
}

export const makeMonthArray = (start: number, months: number) => {
  let i: number
  let arr: object[] = [];
  for (i = 0; i < months + 1; i++) {
    const monthToAddDate = dayjs(start)
      .add(i, 'M')
      .format('YYYY-MM-DD')
    const monthToAddText = dayjs(start)
      .add(i, 'M')
      .format('MMMM YY')
    arr.push({ monthToAddDate, monthToAddText})
  }
  return arr
}

export const daysArray = (max: number, start: number) => {
  let arr = []
  let i: number = 1
  const modSeven = max % 7
  const maxEffective = (modSeven + 6) * 7
  for (i = 1; i < maxEffective + 1 + 7; i++) {
    const count = i - start + 1
    if (count >= 1 && count <= max) {
      arr.push(count)
    } else {
      arr.push(null)
    }
  }
  return removeExtraArray(sliceArray(arr, 7))
}

export const sliceArray = (arr: any, chunk: number) => {
  let finalArr = []
  let i: number, j: number, tempArray: number[]
  for (i = 0, j = arr.length; i < j; i += chunk) {
    tempArray = arr.slice(i, i + chunk)
    finalArr.push(tempArray)
  }
  return finalArr
}

const removeExtraArray = (arr: number[][]) => {
  return arr.map(week => {
    if (week.filter(day => day !== null).length === 0) {
      return []
    } else {
      return week
    }
  })
}

