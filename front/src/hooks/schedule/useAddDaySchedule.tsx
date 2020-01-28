import { useState, ChangeEvent } from 'react'
import dotenv from 'dotenv'
import path from 'path'
import useModal from '../modal/useModal'
dotenv.config({ path: path.join(__dirname, '.env') })

export default function useAddDaySchedule() {
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
    console.log(goal)
  }

  const handleReset = () => {
    setDate('')
    setTodo('')
    setGoal(0)
  }

  const { onCloseModal } = useModal()

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
      await console.log(daySchedule)
      // handleReset()
      onCloseModal()
    }
    catch (e) {
      console.error(e)
    }
  }

  const handleCancel = () => {
    // handleReset()
    onCloseModal()
  }

  return {
    date, todo, goal, handleDate, handleTodo, handleGoal, handleSubmit, handleCancel
  }
}