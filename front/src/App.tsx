import React, { ChangeEvent, Component } from 'react';
import dayjs from 'dayjs'
import Calendar from './components/calendar/Calendar'
import { DataObj } from './components/calendar/interfaces/Calendar.interface'

// import './App.scss'

class App extends Component<{}> {
  constructor(props: {}) {
    super(props);
  }

  state: StateTypes = {
    now: dayjs(date).valueOf(),
    targetDay: 1,
    targetDateString: '2019-10-01',
    targetMonth: '2019-10-01',
  };

  handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      targetMonth: dayjs(e.target.value)
        .startOf('M')
        .format('YYYY-MM-DD'),
      now: dayjs(e.target.value)
        .startOf('M')
        .format('YYYY-MM-DD')
        .valueOf(),
    });
  };

  handleState = (data: object) => {
    this.setState(data);
  };

  render() {
    const { targetDay, targetDateString, targetMonth } = this.state;
    return (
      <div className="containerDiv container-fluid">
        <div className="headerContainer">
          <header className="header">
            <h1 className="mainHeader">simple-react-calendar-component</h1>
            <p className="caption">
              (for statefull use, uncomment and pick a day to see the
              differance)
            </p>
          </header>
        </div>
        <Calendar
          targetDay={this.state.targetDay}
          targetMonth={this.state.targetMonth}
          // title="My Custom Header"
          // titleContainerClass="exampleTitleContainerClass"
          // showMonth={true}
          // monthTitleClass="exampleMonthTitleClass"
          onClickDay={(day: number, data: DataObj) =>
            console.log('onClick', day, data)
          }
          data={data}
          handleState={this.handleState}
          width="92%"
          containerClassName="exampleClassContainer"
          rowContainerClassName="exampleClassRow"
          dayContainerClassName="exampleClassDay"
          dayDataListClass="exampleDayDataListClass"
          dayDataListItemClass="exampleDayDataListItemClass"
          daysHeaderContainerClass="exampleDaysHeaderContainerClass"
          daysTitleContainerClass="exampleDaysTitleContainerClass"
          colorActiveDate="palegoldenrod"
          colorPastDates="#f1f1f1"
        />
        <div className="stateStatsContainer">
          <div className="stateStats">
            <p className="caption">targetDay: {targetDay}</p>
            <p className="caption">
              targetDateString: {dayjs(targetDateString).format('DD/MM/YYYY')}
            </p>
            <div>
              <label className="inputLabel caption">Pick a Month</label>
              <input
                style={{ marginTop: '20px', marginBottom: '20px' }}
                type="date"
                value={this.state.targetMonth}
                onChange={this.handleOnChange}
              />
            </div>
          </div>
        </div>
        <div className="footerDiv">
          &copy; Created By Stevorated (Shirel Garber)
        </div>
      </div>
    );
  }
}

export default App;

type StateTypes = {
  now: number;
  targetDay: number;
  targetDateString: string;
  targetMonth: string;
};

const date: string = dayjs().format('YYYY-MM-DD');

const data: DataObj[] = [
  {
    day: 1,
    title: 'item 1',
    // component: <div>item1</div>,
  },
  {
    day: 1,
    title: 'item 2',
    // component: <div>item2</div>,
  },
  {
    day: 1,
    title: 'item 6',
    // component: <div>item1</div>,
  },
  {
    day: 1,
    title: 'item 7',
    component: (
      <div
        onClick={() => console.log('clicked me!')}
        onMouseEnter={() => console.log('hover ME!')}
        className="hoverableItem"
      >
        item 7
      </div>
    ),
  },
  {
    day: 2,
    title: 'item 3',
    // component: <div>item3</div>,
  },
  {
    day: 2,
    title: 'item 4',
    // component: <div>item4</div>,
  },
  {
    day: 21,
    title: 'item 5',
    // component: <div>item5</div>,
  },
];