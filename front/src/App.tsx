import React, { FunctionComponent, useEffect } from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import routes from './routes'
import useSchedule from './hooks/useSchedule'
import useUser from './hooks/useUser'

interface InterFace {
  history: History
}

const App: FunctionComponent<InterFace> = ({ history }: InterFace) => {
  console.log('APP')

  const { onGetSchedule } = useSchedule()
  const { onGetUserInfo, onClearTargetUserInfo } = useUser()

  useEffect(() => {
    console.log('app useEffect', onGetUserInfo)
    onGetSchedule(onGetUserInfo ? onGetUserInfo.id : 0)
  }, [])
  // console.log('history', history)

  return (
    <ConnectedRouter history={history}>
      {routes}
    </ConnectedRouter>
  )
}

export default App;
