import React from 'react'
import { Route, Switch } from 'react-router'
import NavBar from '../components/Nav'
import Home from '../views/Home/Home'
import MyPlan from '../views/MyPlan/MyPlan'
import Signup from '../views/User/SignupPage'
import Login from '../views/User/LoginPage'

const routes = (
  <div>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/myplan" component={MyPlan} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />      
    </Switch>
  </div>
)

export default routes