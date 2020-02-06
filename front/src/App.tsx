import React, { FunctionComponent } from 'react';
import { History } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes'

import './styles/scss/App.scss'

interface InterFace {
  history: History
}

const App: FunctionComponent<InterFace> = ({history}: InterFace) => {
  console.log('APP')
  return (
    <>
      <ConnectedRouter history={history}>
        { routes }
      </ConnectedRouter>
    </>
  )
}

export default App;
