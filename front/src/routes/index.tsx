import React from 'react'
import { Route, Switch } from 'react-router'
import NavBar from '../components/Nav/NavBar'
import Home from '../views/Home/Home'
import MyPlan from '../views/MyPlan/MyPlan'
import Login from '../pages/LoginPages'

const routes = (
  <div>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/myplan" component={MyPlan} />
      
      <Route path="/login" component={Login} />
      
      {/* {<Route path="/user/signup" component={Signup} />
      <Route path="/user/login" component={Login} />} */}
    </Switch>
  </div>
)

export default routes