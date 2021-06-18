import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import persistedStore from './Redux/store'
import { PersistGate } from 'redux-persist/integration/react'

import Home from './pages/home'
import Detail from './pages/detail'
import Input from './pages/input'


function App() {
  const {store, persistor} = persistedStore()
  return (
<Provider store = {store}>
  <PersistGate persistor = {persistor}>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/detail' component={Detail} />
        <Route path='/product' component={Input} />
      </Switch>
    </BrowserRouter>
  </PersistGate>
</Provider>
  )
}

export default App
