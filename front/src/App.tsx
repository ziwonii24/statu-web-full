import React, { FunctionComponent, useEffect } from 'react'
import { History } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes'
import useSchedule from './hooks/useSchedule'

interface InterFace {
  history: History
}

const App: FunctionComponent<InterFace> = ({history}: InterFace) => {
  console.log('APP')

  const { onGetSchedule } = useSchedule()

  useEffect(() => {
    onGetSchedule()
    console.log('app useEffect')
  },[])
  
  return (
    <>
      <ConnectedRouter history={history}>
        { routes }
      </ConnectedRouter>
    </>
  )
}

export default App;
