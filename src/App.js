import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import auth from './services/authService'
import Navbar from './components/navbar'
import ProtectedRoute from './components/common/protectedRoute'
import NotFound from './components/notFound'
import LoginForm from './components/loginForm'
import UserForm from './components/userForm'
import Logout from './components/logout'
import Home from './components/home'
import Compose from './components/compose'
import Subscriptions from './components/subscriptions'
import MessagesLog from './components/messagesLog'
import './App.css'

function App () {
  const [user] = useState(auth.getCurrentUser())

  return (
    <React.Fragment>
      <Navbar username={user && user.name} />
      <main>
        <Switch>
          <Route path='/login' component={LoginForm} />
          <Route path='/logout' component={Logout} />
          <ProtectedRoute path='/users/:id' component={UserForm} />
          <Route path='/compose' component={Compose} />
          <Route path='/subscriptions' component={Subscriptions} />
          <Route path='/log' component={MessagesLog} />
          <Route path='/not-found' component={NotFound} />
          <Route path='/' component={Home} exact />
          <Redirect to='/not-found' />
        </Switch>
      </main>
    </React.Fragment>
  )
}

export default App
