import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './Reducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const persistConfig = {
  key: 'tf',
  storage,
  stateReconciler: hardSet
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const persistedStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(
        thunk,
        logger
      )
    )
  )
  const persistor = persistStore(store)
  return { store, persistor }
}

export default persistedStore
