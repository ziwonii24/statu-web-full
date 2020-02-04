import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'

// root reducer, root saga
import createRootReducer from './store/reducerIndex'
// import { rootSaga } from './store/sagaIndex'


export const history = createBrowserHistory()

export default function configureStore(preloadedState?: any) {
  const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose  // ??
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware  // sagaMiddleware 잘 등록됐는지 확인 필요 
      ),
    ),
  )

  // sagaMiddleware.run(rootSaga)

  // Hot reloading
  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./reducers', () => {
  //     store.replaceReducer(createRootReducer(history));
  //   });
  // }

  return store
}