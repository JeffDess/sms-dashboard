import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import auth from './services/authService'
import Navbar from './components/navbar'
import ProtectedRoute from './components/common/protectedRoute'
import NotFound from './components/pages/notFound'
import LoginForm from './components/pages/loginForm'
import UserForm from './components/pages/userForm'
import Logout from './components/pages/logout'
import Home from './components/pages/home'
import Compose from './components/pages/composeForm'
import Subscriptions from './components/pages/subscriptions'
import MessagesLog from './components/pages/messagesLog'
import './App.css'

function App () {
  const [user, setUser] = useState(auth.getCurrentUser())
  const [activeTab, setActiveTab] = useState(false)

  return (
    <React.Fragment>
      <Navbar username={user && user.name} activeTab={activeTab} />
      <main>
        <Switch>
          <Route
            path='/login'
            render={() => {
              return <LoginForm setUser={setUser} />
            }}
          />
          <Route path='/logout' component={Logout} />
          <ProtectedRoute path='/users/:id' component={UserForm} />
          <Route
            path='/compose'
            render={() => {
              setActiveTab(0)
              return <Compose />
            }}
          />
          <Route
            path='/subscriptions'
            render={() => {
              setActiveTab(1)
              return <Subscriptions />
            }}
          />
          <Route
            path='/log'
            render={() => {
              setActiveTab(2)
              return <MessagesLog />
            }}
          />
          <Route path='/not-found' component={NotFound} />
          <Route path='/' component={Home} exact />
          <Redirect to='/not-found' />
        </Switch>
      </main>
    </React.Fragment>
  )
}

export default App
