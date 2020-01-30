import { DaySchedule, SubSchedule, MainSchedule } from './DataSet.interface'

export const mainschedule: MainSchedule[] = [
  {
    id: '1',
    userId: '1',
    title: '취업하자',
    startDate: '2019-12-26',
    endDate: '2019-2-26',
    recommend: 14,
    view: 169,
    public: true,
    progress: 15.7,
    tag: ['영어', '알고리즘', '인적성'],
    represent: true,
    category1: [
      { id: 1 },
      { id: 2 },
    ],  // large
    category2: [
      { id: 3 },
      { id: 4 },
    ]  // small
  },
  {
    id: '2',
    userId: '1',
    title: '취뽀하자',
    startDate: '2019-1-26',
    endDate: '2019-3-26',
    recommend: 14,
    view: 169,
    public: true,
    progress: 15.7,
    tag: ['영어', '알고리즘', '인적성'],
    represent: true,
    category1: [
      { id: 1 },
      { id: 2 },
    ],  // large
    category2: [
      { id: 3 },
      { id: 4 },
    ]  // small
  },
]

export const subSchedule: SubSchedule[] = [
  {
    id: '1',
    calenderId: '1',
    subTitle: '영어',
    color: '#FF0000',
    startDate: '2019-12-26',
    endDate: '2020-1-26',
  },
  {
    id: '2',
    calenderId: '1',
    subTitle: '인적성',
    color: '#FFE400',
    startDate: '2020-1-3',
    endDate: '2020-2-6',
  },
  {
    id: '3',
    calenderId: '1',
    subTitle: '알고리즘',
    color: '#3D0099',
    startDate: '2020-1-6',
    endDate: '2020-1-20',
  }
]

export const daySchedule: DaySchedule[] = [
  {
    calendarId: '1',
    subTitleId: '1',
    id: '1',
    date: '2020-01-01',
    component: 'item 1',
    goal: 270,
    achieve: 167
  },
  {
    calendarId: '1',
    subTitleId: '2',
    id: '2',
    date: '2020-01-01',
    component: 'item 2',
    goal: 70,
    achieve: 17
  },
  {
    calendarId: '1',
    subTitleId: '3',
    id: '3',
    date: '2020-01-01',
    component: 'item 3',
    goal: 20,
    achieve: 7
  },
  {
    calendarId: '1',
    subTitleId: '3',
    id: '4',
    date: '2020-01-01',
    component: 'item 4',
    goal: 270,
    achieve: 167
  },
  {
    calendarId: '1',
    subTitleId: '3',
    id: '5',
    date: '2020-01-05',
    component: 'item 5',
    goal: 270,
    achieve: 367
  },
  {
    calendarId: '1',
    subTitleId: '1',
    id: '6',
    date: '2019-12-31',
    component: 'item 6',
    goal: 210,
    achieve: 167
  },
  {
    calendarId: '1',
    subTitleId: '2',
    id: '7',
    date: '2020-02-01',
    component: 'item 7',
    goal: 90,
    achieve: 67
  },
  {
    calendarId: '1',
    subTitleId: '2',
    id: '8',
    date: '2020-01-01',
    component: 'item 8',
    goal: 120,
    achieve: 90
  },
]

export const colors = [
  '#FF0000', '#FFE400', '#3D0099', '#999999',
]