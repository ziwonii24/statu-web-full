import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import NavBar from '../components/Nav/NavBar'
import MainPage from '../pages/MainPage'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'
import UpdateUserInfoPage from '../pages/UpdateUserInfoPage'
import PlanPage from '../pages/PlanPage'
import ImportedPlanPage from '../pages/ImportedPlanPage'
import SearchResultPage from '../pages/SearchResultPage'
import CommunityPage from '../pages/CommunityPage'
import DetailPage from '../pages/DetailPage'

const routes = (
  <div>
    <NavBar />
    <div className='body-content'>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/userinfo" component={UpdateUserInfoPage} />
        <Route exact path="/plan/:userName" component={PlanPage} />
        <Route exact path="/importedplan" component={ImportedPlanPage} />
        <Route exact path="/search/:query" component={SearchResultPage} />
        <Route exact path="/community" component={CommunityPage} />
        <Route exact path="/detail/:planId" component={DetailPage} />
        <Redirect path="*" to="/" />
      </Switch>
    </div>
  </div>
)

export default routes