import React, { FunctionComponent } from 'react'
import Study from '../../components/Study'
import Board from '../../components/Board'

const Home: FunctionComponent = () => {
  return (
    <div>
      <Study />
      <Board />
    </div>
  )
}

export default Home