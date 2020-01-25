import React, { FunctionComponent, useState, ChangeEvent } from 'react'
import AddScheduleForm from './AddScheduleForm'
import useModal from '../../../hooks/modal/useModal'
// import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'
import './styles/Modal.scss'
dotenv.config({ path: path.join(__dirname, '.env') })

const Modal: FunctionComponent<{}> = () => {
  const [date, setDate] = useState<string>('')
  const [todo, setTodo] = useState<string>('')
  const [goal, setGoal] = useState<number>(0)

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value)
    console.log(e.target.value)
  }
  const handleTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
    console.log(e.target.value)
  }
  const handleGoal = (e: ChangeEvent<HTMLInputElement>) => {
    setGoal(parseInt(e.target.value))
    console.log(e.target.value)
  }

  const { onCloseModal } = useModal()
  const handleClick = () => {
    onCloseModal()
  }
  const handleSubmit = async () => {
    const SERVER_IP = process.env.REACT_APP_TEST_SERVER
    const daySchedule = {
      "achieve": 0,
      "calenderId": 1,
      "goal": goal,
      "subtitleId": 1,
      "time": "time",
      "today": date,
      "todo": todo,
      "todoId": 2,
      "unit": "string"
    }
    try {
      // await axios.post(SERVER_IP + '/todo', daySchedule)
      console.log('success')
    }
    catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div className="Modal-overlay" />
      <div className="Modal">
        <p className="title">계획 추가</p>
        <AddScheduleForm
          date={date}
          todo={todo}
          goal={goal}
          handleDate={handleDate} 
          handleTodo={handleTodo} 
          handleGoal={handleGoal} 
        />
        <div className="button-wrap">
          <div onClick={() => {
            handleClick()
            handleSubmit()
          }}>
            Confirm
          </div>
          <div onClick={handleClick}>Cancel</div>
        </div>
      </div>
    </>
  )
}

export default Modal