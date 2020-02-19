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
  const { onGetSchedule } = useSchedule()
  const { onGetUserInfo } = useUser()

  useEffect(() => {
    onGetSchedule(onGetUserInfo ? onGetUserInfo.id : 0)
  }, [])

  return (
    <ConnectedRouter history={history}>
      {routes}
    </ConnectedRouter>
  )
}

export default App;
