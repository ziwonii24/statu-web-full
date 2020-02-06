import React, { FunctionComponent } from 'react'
import Study from '../components/Study'
import Board from '../components/Board'

const MainPage: FunctionComponent = () => {
  console.log('main page rendering...')

  return (
    <>
      <Study />
      <Board />
    </>
  )

}

export default MainPage