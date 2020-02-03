import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../views/Home/Home'
import MyPlan from '../views/MyPlan/MyPlan'
import Signup from '../views/User/Signup'
import signup_result from '../components/User/Signup_result'
import NavBar from '../components/Nav/NavBar'

const routes = (
  <div>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/myplan" component={MyPlan} />
      <Route path="/user/signup" component={Signup} />
      <Route path="/user/signup_result" component={signup_result} />
    </Switch>
  </div>
)

export default routes