import React, { FunctionComponent } from 'react'
import uuid from 'uuid'

import Interface from './interfaces/CalendarRow.interface'
import { DaySchedule, SubSchedule } from '../dataSet/DataSet.interface'

import CalendarDay from './CalendarDay'

import './styles/CalendarRow.scss'

const CalendarRow: FunctionComponent<Interface> = (props: Interface) => {
  const {
    week,
    targetMonth,
    targetDay,
    targetDateString,
    handleState,
    dayComponent,
    subSchedule,
    daySchedule,
    rowContainerClassName,
    dayContainerClassName,
    dayDataListClass,
    dayDataListItemClass,
    colorPastDates,
    colorActiveDate,
    isAscending
  } = props

  const renderRows = (week: string[]) => {
    // 한 주에 출력해야할 소목표 개수
    let subScheduleLengthInWeek: number = 0
    let subScheduleOrder: Array<number> = []
    let assignedNumber: Array<number> = []

    // 한 주의 소목표 공간 확보하기 위한 소목표 개수 최댓값
    week.map(day => {
      const weekSubSchedule = subSchedule
        .filter(schedule => schedule.startDate <= day && schedule.endDate >= day)
        .map(schedule => schedule.id)

      subScheduleLengthInWeek = Math.max(subScheduleLengthInWeek, weekSubSchedule.length)
    })


    return week.map(day => {
      // 이번주 소목표들의 순서 결정(이번주 소목표들 중에 끝난 목표 제거 및 새로운 목표 추가)
      const weekSubSchedule = subSchedule
        .filter(schedule => schedule.startDate <= day && schedule.endDate >= day)
        .map(schedule => schedule.id)

      // 기존에 추가되어 있는 일정 중에 끝난 일정이 있다면 값을 0으로 변경하여 나중에 스케줄 추가할 때 빈자리에 들어갈 수 있도록 조정
      const newSubScheduleOrder = subScheduleOrder.map(scheduleId => {
        if ( scheduleId === 0 ) {
          return 0
        }

        let isScheduleEnd: boolean = true
        for (let i = 0; i < weekSubSchedule.length; i++) {
          if (scheduleId === weekSubSchedule[i]) {
            isScheduleEnd = false
            break
          }
        }
        if ( isScheduleEnd ) {
          const removeIdx = assignedNumber.indexOf(scheduleId)
          assignedNumber.splice(removeIdx, 1)
          return 0
        }
        return scheduleId
      })
      subScheduleOrder = newSubScheduleOrder

      // 새로운 소목표가 있는지 확인하고 추가
      weekSubSchedule.map(scheduleId => {
        if (subScheduleOrder.length === 0) {
          subScheduleOrder.push(scheduleId)
          assignedNumber.push(scheduleId)
        } else if ( !assignedNumber.includes(scheduleId) ) {
          // 빈자리 확인 후 추가
          let isAdd: boolean = false
          for (let i = 0; i < subScheduleOrder.length; i++) {
            if ( subScheduleOrder[i] === 0 ) {
              subScheduleOrder[i] = scheduleId
              assignedNumber.push(scheduleId)
              isAdd = true
              break
            }
          }
          if (!isAdd) {
            subScheduleOrder.push(scheduleId)
            assignedNumber.push(scheduleId)
          }
        }
      })

      // CalendarDay로 보내줄 소목표 정의
      let newSubSchedule: SubSchedule[] = []
      subScheduleOrder.map(scheduleId => {
        subSchedule.map(schedule => {
          if ( scheduleId === schedule.id ) {
            newSubSchedule.push(schedule)
          }
        })
      })
      // console.log(day, newSubSchedule)

      return (
        <CalendarDay
          data-test="calendarDay"
          dayContainerClassName={dayContainerClassName}
          dayDataListClass={dayDataListClass}
          dayDataListItemClass={dayDataListItemClass}
          key={`day-${day || uuid()}`}
          date={day}
          targetMonth={targetMonth}
          targetDay={targetDay}
          targetDateString={targetDateString}
          handleState={handleState}
          dayComponent={dayComponent}
          subSchedule={newSubSchedule}
          subScheduleLength={subScheduleLengthInWeek}
          daySchedule={daySchedule}
          colorPastDates={colorPastDates}
          colorActiveDate={colorActiveDate}
          isAscending={isAscending}
        />
      )
    })
  }
  return (
    <div
      data-test="calendarRowContainer"
      className={`calendarRow ${rowContainerClassName}`}
    >
      {renderRows(week)}
    </div>
  )
}

export default CalendarRow