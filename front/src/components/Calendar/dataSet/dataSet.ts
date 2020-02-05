import { MainSchedule } from '../../../store/mainSchedule'
import { SubSchedule } from '../../../store/subSchedule'
import { DaySchedule } from '../../../store/daySchedule'


export const mainScheduleData: MainSchedule[] = [
  {
    id: 1,
    userId: 1,
    title: '취업',
    startDate: '2019-12-26',
    endDate: '2019-02-26',
    recommend: 14,
    view: 169,
    pb: true,
    progress: 15.7,
    tags: ['영어', '알고리즘', '인적성'],
    represent: true,
    category1: [
      '1', '2',
    ],  // large
    category2: [
      '3', '4',
    ]  // small
  },
  {
    id: 2,
    userId: 1,
    title: '취뽀하자',
    startDate: '2019-01-26',
    endDate: '2019-03-26',
    recommend: 14,
    view: 169,
    pb: true,
    progress: 15.7,
    tags: ['영어', '알고리즘', '인적성'],
    represent: false,
    category1: [
      '1', '2',
    ],  // large
    category2: [
      '3', '4',
    ]  // small
  },
  {
    id: 3,
    userId: 1,
    title: '합격하자',
    startDate: '2019-01-26',
    endDate: '2019-03-26',
    recommend: 14,
    view: 169,
    pb: true,
    progress: 15.7,
    tags: ['영어', '알고리즘', '인적성'],
    represent: false,
    category1: [
      '1', '2',
    ],  // large
    category2: [
      '3', '4',
    ]  // small
  },
]

export const subScheduleData: SubSchedule[] = [
  {
    id: 6,
    calendarId: 2,
    subTitle: '인적성',
    color: '#FFE4C4',
    startDate: '2020-01-03',
    endDate: '2020-02-06',
  },
  {
    id: 2,
    calendarId: 1,
    subTitle: '영어',
    color: '#D2691E',
    startDate: '2019-12-26',
    endDate: '2020-01-26',
  },
  {
    id: 3,
    calendarId: 1,
    subTitle: '알고리즘',
    color: '#8FBC8F',
    startDate: '2020-01-06',
    endDate: '2020-01-20',
  },
  {
    id: 4,
    calendarId: 1,
    subTitle: '프로젝트',
    color: '#ADD8E6',
    startDate: '2020-02-10',
    endDate: '2020-02-20',
  },
  {
    id: 5,
    calendarId: 1,
    subTitle: '달력만들기',
    color: '#E6E6FA',
    startDate: '2020-01-28',
    endDate: '2020-01-29',
  },
]

export const dayScheduleData: DaySchedule[] = [
  {
    calendarId: 1,
    subTitleId: 2,
    id: 1,
    date: '2020-01-01',
    todo: 'item 1',
    goal: 270,
    achieve: 167
  },
  {
    calendarId: 1,
    subTitleId: 2,
    id: 2,
    date: '2020-01-01',
    todo: 'item 2',
    goal: 70,
    achieve: 17
  },
  {
    calendarId: 1,
    subTitleId: 2,
    id: 3,
    date: '2020-01-01',
    todo: 'item 3',
    goal: 20,
    achieve: 7
  },
  {
    calendarId: 1,
    subTitleId: 1,
    id: 4,
    date: '2020-01-01',
    todo: 'item 4',
    goal: 270,
    achieve: 167
  },
  {
    calendarId: 1,
    subTitleId: 6,
    id: 5,
    date: '2020-01-05',
    todo: 'item 5',
    goal: 270,
    achieve: 367
  },
  {
    calendarId: 1,
    subTitleId: 2,
    id: 6,
    date: '2019-12-31',
    todo: 'item 6',
    goal: 210,
    achieve: 167
  },
  {
    calendarId: 1,
    subTitleId: 1,
    id: 7,
    date: '2020-02-01',
    todo: 'item 7',
    goal: 90,
    achieve: 67
  },
  {
    calendarId: 1,
    subTitleId: 2,
    id: 8,
    date: '2020-01-01',
    todo: 'item 8',
    goal: 120,
    achieve: 90
  },
  {
    calendarId: 1,
    subTitleId: 1,
    id: 9,
    date: '2020-03-01',
    todo: 'item 9',
    goal: 120,
    achieve: 90
  },
]

export const colors = [
  '#FFE4C4', '#D2691E', '#8FBC8F', '#ADD8E6', '#E6E6FA',
]