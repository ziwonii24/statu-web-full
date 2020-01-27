import React, { FunctionComponent } from 'react';
import { History } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes'

interface InterFace {
  history: History
}

interface Props {
  history: History;
}

const App: FunctionComponent<InterFace> = ({history}: Props) => {
  return (
    <ConnectedRouter history={history}>
      { routes }
    </ConnectedRouter>
  )
}

export default App;
