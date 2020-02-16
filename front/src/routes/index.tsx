import React from 'react'
import { Route, Switch } from 'react-router'
import NavBar from '../components/Nav/NavBar'
import InfoPage from '../pages/InfoPage'
import MainPage from '../pages/MainPage'
import SignupPage from '../pages/SignupPage'
import UserPage from '../pages/UserPage'
import PlanPage from '../pages/PlanPage'
import StarPage from '../pages/StarPage'
import SearchPage from '../pages/SearchPage'
import DetailPage from '../pages/DetailPage'
import ErrorPage from '../pages/ErrorPage'
import Footer from '../components/Footer/FooterForm'

const routes = (
  <div>
    <NavBar />
    <div className='body-content'>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/info" component={InfoPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/user" component={UserPage} />
        <Route path="/plan/:userName" component={PlanPage} />
        <Route path="/star" component={StarPage} />
        <Route path="/search/:query" component={SearchPage} />
        <Route path="/detail/:planId" component={DetailPage} />
        <Route path="/error" component={ErrorPage} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
    <Footer />
  </div>
)

export default routes