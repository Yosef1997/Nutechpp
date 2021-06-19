import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import persistedStore from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

import PrivateRoute from './components/helper/privateRoute'


import Home from './pages/home'
import Detail from './pages/detail'
import Input from './pages/input'
import Register from './pages/register'
import Login from './pages/login'


class App extends Component {
  render() {
    const { store, persistor } = persistedStore()
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
              <Route path='/detail' component={Detail} />
              <PrivateRoute path='/product' privateComponent={Input} />
            </Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
